import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UfundUiAccountComponent } from './ufund-ui-account/ufund-ui-account.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { UfundUiCartComponent } from './ufund-ui-cart/ufund-ui-cart.component';
import { UfundUiAdminDashboardComponent } from './ufund-ui-admin-dashboard/ufund-ui-admin-dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: 'home',pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'account', component: UfundUiAccountComponent},
    { path: 'signup', component: SignUpComponent},
    { path: 'cart', component: UfundUiCartComponent},
    { path: 'admin-dashboard', component: UfundUiAdminDashboardComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
