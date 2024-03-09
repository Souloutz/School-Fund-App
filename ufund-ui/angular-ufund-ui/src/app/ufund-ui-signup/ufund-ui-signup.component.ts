import { Component } from '@angular/core';

import { UserService } from "../user.service";
import { CurrentUserService } from '../current.user.service';
import { Router } from '@angular/router';

import { User } from '../model/user';

@Component({
  selector: 'app-ufund-ui-signup',
  templateUrl: './ufund-ui-signup.component.html',
  styleUrl: './ufund-ui-signup.component.css'
})
export class UfundUiSignUpComponent {

  constructor(
    private currentUserService : CurrentUserService,
    private userService : UserService,
    private router : Router) {}

  userInfo : User = this.currentUserService.getCurrentUser().getValue();
  
  
  signUp(user : User) : void
  {

    this.userService.addUser(user).subscribe(
      (userInput : User) =>
      {
        console.log('User data: ', userInput);
        if(userInput) {
          console.log("Success!");
          this.currentUserService.setCurrentUser(userInput);
          this.router.navigate(['']);
        }
        else
        {
          console.log("Could not make account");
        }
      }
    );
  }
}

