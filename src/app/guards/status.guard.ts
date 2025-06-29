import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export const statusGuard: CanActivateFn = () => {
    const auth = inject(Auth);
    const router = inject(Router);
    const firestore = inject(Firestore);

    return new Promise<boolean>((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.navigate(['/login']);
                return resolve(false);
            }

            const userRef = doc(firestore, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            const status = userSnap.exists() ? (userSnap.data()['status'] || '').toLowerCase() : 'active';

            if (status === 'unactive') {
                alert('Your account has been suspended');
                router.navigate(['/signup']);
                return resolve(false);
            }

            resolve(true);
        });
    });
};
