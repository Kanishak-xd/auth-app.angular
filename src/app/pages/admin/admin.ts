import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs, updateDoc, doc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
})
export class Admin implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  users: any[] = [];
  logs: any[] = [];

  async ngOnInit() {
    await this.loadUsers();
    await this.loadLogs();
  }

  async loadUsers() {
    const usersCol = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersCol);
    this.users = snapshot.docs.map(docSnap => {
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
}
