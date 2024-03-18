import { Component } from '@angular/core';
import { CurrentUserService } from '../current.user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-ufund-ui-nav',
  templateUrl: './ufund-ui-nav.component.html',
  styleUrl: './ufund-ui-nav.component.css'
})
export class UfundUiNavComponent {

  constructor(
    private currentUserService : CurrentUserService,
    private router : Router) {}

  title = 'Ufund Nav';

  onClickAccount()
  {
    try {
    if(this.currentUserService.isUserLoggedIn()) {
      //switches to their account dashboard
      this.router.navigate(['/account']);
    }
    else
    {
      //switches to the log in screen if they are not logged in
      this.router.navigate(['/login']);
    }
    } catch (error) {
      console.log("Error getting user info: ", error);
    }
  }

  onClickCart() {
    try {
      if(this.currentUserService.isUserLoggedIn()) {
        //switches to the user's cart page when they're logged in
        this.router.navigate(['/cart']);
      } else {
        //switches to log in page if no user is logged in
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
