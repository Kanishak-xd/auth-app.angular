import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Forgot } from './pages/forgot/forgot';
import { Profile } from './pages/profile/profile';
import { Admin } from './pages/admin/admin';

import { authGuard } from './guards/auth.guard';
import { statusGuard } from './guards/status.guard';

export const routes: Routes = [
    { path: '', component: Home, canActivate: [authGuard, statusGuard] },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'forgot-password', component: Forgot },
    { path: 'profile', component: Profile, canActivate: [authGuard, statusGuard] },
    { path: 'home', component: Home, canActivate: [authGuard, statusGuard] },
    { path: 'admin', component: Admin, canActivate: [authGuard, statusGuard] }
];
