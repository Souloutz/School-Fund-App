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

  checkLogIn()
  {
    console.log("Current User's id", this.currentUserService.getCurrentUser().getValue().id)
    return !(this.currentUserService.getCurrentUser().getValue().id == -1);//if there is a user logged in
  }


  onClickAccount()
  {
    try {
      if(!this.checkLogIn())
    {
      this.router.navigate(['/login']);
      //switches to the log in screen if they are not logged in
    }
    else
    {
      this.router.navigate(['/account'])//switches to their account dashboard
    }
    } catch (error) {
      console.log("Error getting user info: ", error);
    }
  }
}
