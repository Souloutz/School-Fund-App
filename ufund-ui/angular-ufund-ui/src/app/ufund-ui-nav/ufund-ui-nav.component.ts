import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { RouteConfigLoadEnd } from '@angular/router';



@Component({
  selector: 'app-ufund-ui-nav',
  templateUrl: './ufund-ui-nav.component.html',
  styleUrl: './ufund-ui-nav.component.css'
})
export class UfundUiNavComponent {

  constructor(private userservice : UserService) {}

  checkLogIn()
  {
    return this.userservice.getCurrentUser() === null;//checks if there is a current user logged in
  }


  onClickAccount()
  {
    if(this.checkLogIn())
    {
      window.location.href = './account.html';//switches to their account dashboard
    }
    else
    {
      window.location.href = './login.html';//switches to the log in screen if they are not logged in
    }
  }
}
