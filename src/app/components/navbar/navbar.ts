import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  profilePicUrl: string | null = null;

  constructor(private auth: Auth, private firestore: Firestore) { }

  ngOnInit() {
    // Wait for Firebase to confirm the user is logged in
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        await this.loadProfilePic(user);
      } else {
        this.profilePicUrl = null;
      }
    });

    // Listen for updates when profile picture changes
    window.addEventListener('profile-pic-updated', async () => {
      const user = this.auth.currentUser;
      if (user) {
        await this.loadProfilePic(user);
      }
    });
  }

  async loadProfilePic(user: User) {
    const userRef = doc(this.firestore, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      this.profilePicUrl = data['profilePicUrl'] || null;
    }
  }

  toggleSidebar() {
    document.dispatchEvent(new CustomEvent('toggle-sidebar'));
  }
}
