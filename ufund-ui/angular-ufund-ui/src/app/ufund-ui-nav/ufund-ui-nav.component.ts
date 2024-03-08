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
    return this.currentUserService.getCurrentUser()?.id == -1//checks if there is a current user logged in
  }


  onClickAccount()
  {
    if(this.checkLogIn())
    {
      this.router.navigate(['/account'])//switches to their account dashboard
    }
    else
    {
      this.router.navigate(['/login']);//switches to the log in screen if they are not logged in
    }
  }
}
