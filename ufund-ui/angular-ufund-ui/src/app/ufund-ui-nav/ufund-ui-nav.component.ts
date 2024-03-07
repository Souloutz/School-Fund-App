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
    return this.userservice.getCurrentUser() === null;
  }


  onClickAccount()
  {
    if(this.checkLogIn())
    {
      window.location.href = './account.html';
    }
    else
    {
      window.location.href = './login.html';
    }
  }
}
