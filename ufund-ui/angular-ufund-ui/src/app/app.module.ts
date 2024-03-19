import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';

import { UfundUiLoginComponent } from './ufund-ui-login/ufund-ui-login.component';
import { UfundUiHomeComponent } from './ufund-ui-home/ufund-ui-home.component';
import { UfundUiNavComponent } from './ufund-ui-nav/ufund-ui-nav.component';
import { UfundUiAccountComponent } from './ufund-ui-account/ufund-ui-account.component';
import { UfundUiSignUpComponent } from './ufund-ui-signup/ufund-ui-signup.component';
import { UfundUiCartComponent } from './ufund-ui-cart/ufund-ui-cart.component';

import { FormsModule } from '@angular/forms';
import { UfundUiAdminDashboardComponent } from './ufund-ui-admin-dashboard/ufund-ui-admin-dashboard.component';

import { GiftService } from './gift.service';
import { GiftsComponent } from './gifts/gifts.component';
import { GiftDetailComponent } from './ufund-ui-detail/ufund-ui-detail.component';


@NgModule({
    declarations: [
      AppComponent,
      UfundUiLoginComponent,
      UfundUiHomeComponent,
      UfundUiNavComponent,
      UfundUiAccountComponent,
      UfundUiSignUpComponent,
      UfundUiCartComponent,
      UfundUiAdminDashboardComponent,
      GiftsComponent,
      GiftDetailComponent
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
