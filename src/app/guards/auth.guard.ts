import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export const authGuard: CanActivateFn = async (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    const firestore = inject(Firestore);

    return new Promise<boolean>((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.navigate(['/login']);
                resolve(false);
                return;
            }

            // Route-specific admin check
            if (state.url === '/admin') {
                const userRef = doc(firestore, 'users', user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const role = userSnap.data()['role'] || 'User';
                    if (role !== 'Admin') {
                        router.navigate(['/']);
                        resolve(false);
                        return;
                    }
                } else {
                    router.navigate(['/']);
                    resolve(false);
                    return;
                }
            }

            // Otherwise allow access
            resolve(true);
        });
    });
};
