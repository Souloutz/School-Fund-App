import { Component } from '@angular/core';

import { UserService } from "../user.service";
import { CurrentUserService } from '../current.user.service';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ufund-ui-login',
  templateUrl: './ufund-ui-login.component.html',
  styleUrl: './ufund-ui-login.component.css'
})
export class UfundUiLoginComponent {

  constructor(
    private currentUserService : CurrentUserService,
    private userService : UserService,
    private router : Router) {}

  userInfo : BehaviorSubject<User> = this.currentUserService.getCurrentUser();
  
  signIn(user : BehaviorSubject<User>) : void
  {
      this.userService.getUserByEmail(user.getValue().email).subscribe(//sends request for 
      //to get the User with the email given by the input
        (emailResponse: User) =>
        {
          console.log('User data: ', emailResponse);
          const userResponse : User = emailResponse;
          if(userResponse) {
            if(user.getValue().password.localeCompare( userResponse.password) == 0)//if they are the exact same
            {
              console.log("Success!");
              this.currentUserService.setCurrentUser(user);
              this.router.navigate(['']);
            }
          }
        }
      );
  }
}

