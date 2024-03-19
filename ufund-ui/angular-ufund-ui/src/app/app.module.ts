import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';

import { UfundUiAccountComponent } from './ufund-ui-account/ufund-ui-account.component';
import { UfundUiCartComponent } from './ufund-ui-cart/ufund-ui-cart.component';

import { FormsModule } from '@angular/forms';
import { UfundUiAdminDashboardComponent } from './ufund-ui-admin-dashboard/ufund-ui-admin-dashboard.component';


@NgModule({
    declarations: [
      AppComponent,
      UfundUiAccountComponent,
      UfundUiCartComponent,
      UfundUiAdminDashboardComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
