import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';
import { Rightbar } from './components/rightbar/rightbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidebar, Rightbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'auth-app';
}
