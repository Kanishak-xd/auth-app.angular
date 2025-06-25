import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
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
    this.loadProfilePic();

    // Listen for updates when profile pic changes on home page
    window.addEventListener('profile-pic-updated', () => {
      this.loadProfilePic();
    });
  }

  async loadProfilePic() {
    const user = this.auth.currentUser;
    if (!user) return;

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
