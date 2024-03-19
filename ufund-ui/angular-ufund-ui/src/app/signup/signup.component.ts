import { Component } from '@angular/core';

import { UserService } from "../services/user.service";
import { CurrentUserService } from '../services/current.user.service';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignUpComponent {

  constructor(
    private currentUserService : CurrentUserService,
    private userService : UserService,
    private router : Router) {}

  userInfo: User = this.currentUserService.getCurrentUser();
  
  /**
   * Sign up a user by creating a new account
   * @param user 
   */
  signUp(user: User): void {
    if (this.checkValidInfo(user)) {

      this.userService.isEmailTaken(user.email).then((isTaken: boolean) => {
        if (isTaken) {
          console.log("email already exists");
          window.alert("Email already exists, please try again");
        } 
        
        else {
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
    else
      console.log("Passed information is invalid");
  }

  /**
   * Check the validity of supplied user information
   * @param user 
   * @returns true if user information is valid
   *          false if not
   */
  checkValidInfo(user: User): boolean {
    return (this.checkValidEmail(user.email) &&
            this.checkValidPassword(user.password) &&
            user.username != '');
  }

  /**
   * Check the validity of an email
   * @param email 
   * @returns true if email is valid
   *          false if not
   */
  checkValidEmail(email: string): boolean {
    // regex that represents an email
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (res.test(email.toLowerCase()))
      return true;
    else {
      window.alert("Invalid email, try again");
      return false;
    }
  }

  /**
   * Check the validity of a password
   * @param password 
   * @returns true if password matches these requirements:
   *            - at least 8 characters
   *            - at least 1 uppercase
   *            - at least 1 lowercase
   *            - at least 1 number
   *            - at least 1 special character
   *          false otherwise
   */
  checkValidPassword(password: string): boolean{
    // regex that represents a password with at least 8 characters, one letter, at least 1 number, at least 1 special character
    const res =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (res.test(password.toLowerCase()))
      return true;
    else {
      window.alert("Invalid password, try again.\nMake sure that it is at least 8 characters long, and includes at least 1 letter, 1 number, 1 special character");
      return false;
    }
  }
}


