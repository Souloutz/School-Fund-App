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
  
  /**
   * 
   * @param user 
   * represents the main sign up function 
   * that is used for creating a new account
   * 
   * 1) checks if the passed info is valid
   * by using Regex
   * 
   * 2) asks the user service if the email 
   * is currently in use by another account
   * 
   * 3) creates a new user with the passed information
   */
  signUp(user : User) : void
  {
    if(this.checkIfInfoValid(user)){

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
   } else {
    console.log("Passed information is invalid");
   }
  }

  checkIfInfoValid(user : User) : boolean{
    return ( this.checkEmailValid(user.email) &&
             this.checkPassValid(user.password) &&
             user.username != '');
  }


  /**
   * 
   * @param email 
   * @returns true if email is valid
   */
  checkEmailValid( email : string) : boolean{
    //Regex string to represent an email
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //returns true if email matches the regex
    return res.test(String(email).toLowerCase());
  }

  /**
   * 
   * @param password 
   * @returns true if password matches these requirements:
   * at least 8 characters
   * at least 1 uppercase
   * at least 1 lowercase
   * at least 1 number
   * at least 1 special character
   */
  checkPassValid(password : string) : boolean{
    //Regex for password with at least 8 characters,
    //at least 1 uppercase.
    //at least 1 lowercase
    //at least 1 number
    //at least 1 special character
    const res = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return res.test(String(password).toLowerCase());
  }
}

