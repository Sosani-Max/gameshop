import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { Homelogin } from './homelogin/homelogin';
import { Admin } from './admin/admin';
import { Profile } from './profile/profile';
import { Gamesell } from './gamesell/gamesell';
import { MakePayment } from './make-payment/make-payment';
import { Basket } from './basket/basket';
import { MpmBasket } from './mpm-basket/mpm-basket';
import { Mygame } from './mygame/mygame';
import { Wallet } from './wallet/wallet';
import { History } from './history/history';
import { User } from './user/user';
import { Promotion } from './promotion/promotion';
import { Addgame } from './addgame/addgame';
import { Namegame } from './namegame/namegame';
import { Editgame } from './editgame/editgame';
import { AdminProfile } from './admin-profile/admin-profile';
import { Customer } from './customer/customer';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login},
  { path: 'register', component: Register },
  { path: 'homelogin', component: Homelogin },
  { path: 'admin', component: Admin },
  { path: 'profile', component: Profile },
  { path: 'gamesell', component: Gamesell },
  { path: 'make-payment', component: MakePayment },
  { path: 'basket', component: Basket },
  { path: 'mpm-basket', component: MpmBasket },
  { path: 'mygame', component: Mygame },
  { path: 'wallet', component: Wallet },
  { path: 'history', component: History },
  { path: 'user', component:  User},
  { path: 'promotion', component:  Promotion},
  { path: 'addgame', component:  Addgame},
  { path: 'namegame', component:  Namegame},
  { path: 'editgame', component:  Editgame},
  { path: 'admin-profile', component:  AdminProfile},
  { path: 'customer', component:  Customer}
];