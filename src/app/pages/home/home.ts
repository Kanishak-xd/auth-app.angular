import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
})
export class Home {
  private auth = inject(Auth);
  email: string = '';

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      this.email = user.email || '';
    }
  }
}
