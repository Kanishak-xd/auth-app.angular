import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Forgot } from './pages/forgot/forgot';
import { Profile } from './pages/profile/profile';
import { Admin } from './pages/admin/admin';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'forgot-password', component: Forgot },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'admin', component: Admin, },
];
