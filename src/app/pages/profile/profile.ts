import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signOut, sendPasswordResetEmail, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './profile.html',
})
export class Profile {
    private auth = inject(Auth);
    private firestore = inject(Firestore);
    private router = inject(Router);

    isEditing = false;

    firstName: string = '';
    lastName: string = '';
    dob: string = '';
    mobile: string = '';
    email: string = '';
    profilePicUrl: string = '';

    async ngOnInit() {
        const user = this.auth.currentUser;
        if (!user) return;

        this.email = user.email || '';
        const fullName = user.displayName || '';
        const [fname, ...lnameParts] = fullName.split(' ');
        this.firstName = fname || '';
        this.lastName = lnameParts.join(' ') || '';

        const userRef = doc(this.firestore, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            this.dob = data['dob'] || '';
            this.mobile = data['mobile'] || '';
            this.profilePicUrl = data['profilePicUrl'] || '';
        }
    }

    toggleEdit() {
        if (this.isEditing) {
            this.onUpdate();
        }
        this.isEditing = !this.isEditing;
    }

    async onUpdate() {
        const user = this.auth.currentUser;
        if (!user) return;

        const fullName = `${this.firstName} ${this.lastName}`.trim();

        await updateProfile(user, { displayName: fullName });

        await setDoc(
            doc(this.firestore, 'users', user.uid),
            {
                uid: user.uid,
                email: user.email,
                fullName,
                firstName: this.firstName,
                lastName: this.lastName,
                dob: this.dob,
                mobile: this.mobile,
                profilePicUrl: this.profilePicUrl,
                updatedAt: new Date(),
            },
            { merge: true }
        );

        alert('Profile updated!');
        this.isEditing = false;
    }

    async onImageSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'unsigned_upload');

        const cloudName = 'dykzzd9sy';
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            this.profilePicUrl = data.secure_url;

            const user = this.auth.currentUser;
            if (user) {
                await setDoc(
                    doc(this.firestore, 'users', user.uid),
                    { profilePicUrl: this.profilePicUrl, updatedAt: new Date() },
                    { merge: true }
                );
            }
        } catch (err) {
            console.error('Image upload failed:', err);
            alert('Image upload failed!');
        }

        window.dispatchEvent(new CustomEvent('profile-pic-updated'));
    }

    async resetPassword() {
        const email = this.auth.currentUser?.email;
        if (!email) return;

        await sendPasswordResetEmail(this.auth, email);
        alert('Reset password email sent!');
    }

    async logout() {
        await signOut(this.auth);
        this.router.navigate(['/login']);
    }
} 