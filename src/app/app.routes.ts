import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { Homelogin } from './homelogin/homelogin';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login},
    { path: 'register', component: Register },
    { path: 'homelogin', component: Homelogin },
     { path: 'admin', component: Admin }
];