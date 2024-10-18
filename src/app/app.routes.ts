import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { WishComponent } from './wish/wish.component';
import { ViewComponent } from './view/view.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './guards/auth.guard';





export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'reg', component:RegComponent},
    {path:'log', component:LoginComponent},
    {path:'wish',canActivate:[authGuard], component:WishComponent},
    {path:'cart',canActivate:[authGuard], component:CartComponent},
    {path:'view/:id',canActivate:[authGuard], component:ViewComponent},
    {path:'check',canActivate:[authGuard], component:CheckoutComponent}
];
