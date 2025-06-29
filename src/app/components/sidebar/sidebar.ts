import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  isOpen = false;
  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    document.addEventListener('toggle-sidebar', () => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.checkUserRole();
      }
    });

    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
      if (user) this.checkUserRole();
    });
  }

  async checkUserRole() {
    const user = this.auth.currentUser;
    if (!user) return;

    const userRef = doc(this.firestore, 'users', user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      this.isAdmin = data['role'] === 'Admin';
    }
  }

  closeSidebar() {
    this.isOpen = false;
  }

  goToAdminDashboard() {
    this.router.navigate(['/admin']);
    this.closeSidebar();
  }
}
