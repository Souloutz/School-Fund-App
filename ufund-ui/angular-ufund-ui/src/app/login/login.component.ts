import { Component } from '@angular/core';

import { UserService } from "../services/user.service";
import { CurrentUserService } from '../services/current.user.service';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private currentUserService : CurrentUserService,
    private userService : UserService,
    private router : Router) { }

  userInfo: User = this.currentUserService.getCurrentUser();
  
  /**
   * Sign in to the user account
   * @param user 
   */
  signIn(user: User): void {
    const userInput = user;

    if (this.checkIfEmailValid(user.email)) {
      // //sends request for to get the User with the email given by the input
      this.userService.getUserByEmail(userInput.email).subscribe(
        (emailResponse: User) => {
          console.log('User data: ', emailResponse);

          const userResponse: User = emailResponse; // creates a user from the response from the server

          if (userResponse) {
            if (userInput.password === userResponse.password) {
              console.log("Success!");

              // sets current user to the response from the server
              this.currentUserService.setCurrentUser(userResponse);

              // checks if the user is an admin
              if (this.isAdmin(userResponse))
                this.router.navigate(['/admin-dashboard'])
              else 
                this.router.navigate(['']);
            }

            else {
              console.log("Wrong password");
              window.alert("Invalid Password");
            }
          }
        }
      );
    } 
    
    else
      window.alert("Invalid email, try again");
  }

  /**
   * Check if an email is valid
   * @param email 
   * @returns true if the email is a valid email address
   *          false if not
   */
  checkIfEmailValid(email: string) : boolean{
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return res.test(String(email).toLowerCase());
  }

  /**
   * Check if a user is an admin
   * @param user 
   * @returns true if the user is the admin
   */
  isAdmin(user: User): boolean {
    // TODO - update getting of admin email through REST API call instead
    return (user.email == 'admin@google.com');
  }
}

