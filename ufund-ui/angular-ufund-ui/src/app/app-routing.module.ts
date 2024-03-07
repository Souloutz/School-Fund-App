import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UfundUiLoginComponent } from './ufund-ui-login/ufund-ui-login.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'login', component: UfundUiLoginComponent},
    //{ path: 'account', component: UfundUiAccountComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
