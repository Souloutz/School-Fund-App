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

import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { ModalServiceComponent } from './modal.service/modal.service.component';//for modal pop ups

import { FormControl } from '@angular/forms';

@NgModule({
    declarations: [
      AppComponent,
      UfundUiLoginComponent,
      UfundUiHomeComponent,
      UfundUiNavComponent,
      UfundUiAccountComponent,
      UfundUiSignUpComponent,
      ModalServiceComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      MatDialogModule,
      FormControl
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
