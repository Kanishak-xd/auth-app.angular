import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signOut, sendPasswordResetEmail, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
})
export class Home {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  isEditing = false;

  firstName: string = '';
  lastName: string = '';
  dob: string = '';
  mobile: string = '';
  email: string = '';

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

    // Update Firebase Auth display name
    await updateProfile(user, { displayName: fullName });

    // Update Firestore document
    await setDoc(doc(this.firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      fullName,
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      mobile: this.mobile,
      updatedAt: new Date(),
    });

    alert('Profile updated!');
    this.isEditing = false;
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
