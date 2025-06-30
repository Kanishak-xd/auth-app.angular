import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs, updateDoc, doc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
})
export class Admin implements OnInit {
  allUsers: any[] = [];
  users: any[] = [];
  logs: any[] = [];

  searchQuery = '';

  @ViewChild('statusActive', { static: false }) statusActive!: ElementRef<HTMLInputElement>;
  @ViewChild('statusUnactive', { static: false }) statusUnactive!: ElementRef<HTMLInputElement>;
  @ViewChild('roleAdmin', { static: false }) roleAdmin!: ElementRef<HTMLInputElement>;
  @ViewChild('roleUser', { static: false }) roleUser!: ElementRef<HTMLInputElement>;

  constructor(private firestore: Firestore, private auth: Auth) { }

  async ngOnInit() {
    await this.loadUsers();
    await this.loadLogs();
  }

  async loadUsers() {
    const usersCol = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersCol);
    this.allUsers = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      const normalizedStatus = (data['status'] || 'Active').toLowerCase();
      return {
        uid: data['uid'],
        email: data['email'],
        fullName: data['fullName'],
        status: normalizedStatus,
        role: data['role'] || 'User'
      };
    });
    this.applyFilters();
  }

  async loadLogs() {
    const logsCol = collection(this.firestore, 'logs');
    const snapshot = await getDocs(logsCol);
    this.logs = snapshot.docs.map(doc => doc.data());
  }

  async toggleStatus(userId: string, currentStatus: string) {
    const current = (currentStatus || 'Active').toLowerCase();
    const newStatus = current === 'active' ? 'Unactive' : 'Active';
    const userRef = doc(this.firestore, 'users', userId);
    await updateDoc(userRef, { status: newStatus });
    await this.loadUsers();
  }

  onFiltersChanged() {
    this.applyFilters();
  }

  applyFilters() {
    const statusFilters: string[] = [];
    if (this.statusActive?.nativeElement.checked) statusFilters.push('active');
    if (this.statusUnactive?.nativeElement.checked) statusFilters.push('unactive');

    const roleFilters: string[] = [];
    if (this.roleAdmin?.nativeElement.checked) roleFilters.push('Admin');
    if (this.roleUser?.nativeElement.checked) roleFilters.push('User');

    const searchLower = this.searchQuery.toLowerCase();

    this.users = this.allUsers.filter(user => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);

      const matchesStatus = statusFilters.length === 0 || statusFilters.includes(user.status);
      const matchesRole = roleFilters.length === 0 || roleFilters.includes(user.role);

      return matchesSearch && matchesStatus && matchesRole;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.statusActive.nativeElement.checked = false;
    this.statusUnactive.nativeElement.checked = false;
    this.roleAdmin.nativeElement.checked = false;
    this.roleUser.nativeElement.checked = false;
    this.applyFilters();
  }
}
