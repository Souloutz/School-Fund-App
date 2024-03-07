import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';

import { UfundUiLoginComponent } from './ufund-ui-login/ufund-ui-login.component';
import { UfundUiHomeComponent } from './ufund-ui-home/ufund-ui-home.component';
import { UfundUiNavComponent } from './ufund-ui-nav/ufund-ui-nav.component';

@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      UfundUiLoginComponent,
      UfundUiHomeComponent,
      UfundUiNavComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
