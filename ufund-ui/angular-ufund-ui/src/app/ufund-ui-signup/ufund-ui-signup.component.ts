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

  userInfo : User = this.currentUserService.getCurrentUser();
  
  
  signUp(user : User) : void
  {

    this.userService.isEmailTaken(user.email).then((isTaken: boolean) => {
      if(isTaken) {
        console.log("email already exists");
        window.alert("Email already exists, please try again");
      } else {
        this.userService.addUser(user).subscribe(
        (userInput : User) => {
            console.log('User data: ', userInput);
              console.log("Success!");
              this.currentUserService.setCurrentUser(userInput);
              this.router.navigate(['']);
        })
      }
    });
  }
}


