import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UfundUiLoginComponent } from './ufund-ui-login/ufund-ui-login.component';
import { UfundUiAccountComponent } from './ufund-ui-account/ufund-ui-account.component';
import { UfundUiHomeComponent } from './ufund-ui-home/ufund-ui-home.component';
import { UfundUiSignUpComponent } from './ufund-ui-signup/ufund-ui-signup.component';
import { UfundUiCartComponent } from './ufund-ui-cart/ufund-ui-cart.component';
import { UfundUiAdminDashboardComponent } from './ufund-ui-admin-dashboard/ufund-ui-admin-dashboard.component';
import { GiftDetailComponent } from './ufund-ui-detail/ufund-ui-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'home',pathMatch: 'full'},
    { path: 'home', component: UfundUiHomeComponent},
    { path: 'login',component: UfundUiLoginComponent},
    { path: 'account', component: UfundUiAccountComponent},
    { path: 'signup', component:UfundUiSignUpComponent},
    { path: 'cart', component:UfundUiCartComponent},
    { path: 'admin-dashboard', component: UfundUiAdminDashboardComponent},
    { path: 'detail/:id', component: GiftDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
