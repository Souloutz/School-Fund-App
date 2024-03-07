import { Component } from '@angular/core';

import { UserService } from "../user.service";
import { CurrentUserService } from '../current.user.service';

import { User } from '../model/user';

@Component({
  selector: 'app-ufund-ui-login',
  templateUrl: './ufund-ui-login.component.html',
  styleUrl: './ufund-ui-login.component.css'
})
export class UfundUiLoginComponent {

  constructor(
    private currentUserService : CurrentUserService,
    private userService : UserService) {}

  userInfo = {//the base user that will be changed eventually
    //so it can be used in the html component
    id: -1,//initialized 
    username: '',
    password: '',
    email: '',
    cart: [],
    orders: [],
  }
  
  signIn(user : User) : void
  {
    try {
      
      this.userService.getUserByEmail(user.email).subscribe(
        (emailResponse: User) =>
        {
          console.log('User data: ', emailResponse);
          const userResponse : User = emailResponse;
          if(userResponse) {
            if(user.password.localeCompare( userResponse.password) == 0)//if they are the exact same
            {
              console.log("Success!");
              this.currentUserService.setCurrentUser(user);
              window.location.href ='./home.html';
            }
          }
        }
      )
    }
    catch (error) {
      console.error("Error logging in: ", error);
    }
  }

}
