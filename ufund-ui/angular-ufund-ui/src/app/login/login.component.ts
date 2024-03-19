import { Component } from '@angular/core';

import { UserService } from "../services/user.service";
import { CurrentUserService } from '../services/current.user.service';
import { Router, RouterLink } from '@angular/router';

import { User } from '../model/user';
import { FormsModule } from '@angular/forms';

import { sha512 } from 'sha512-crypt-ts';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private router: Router) { }

  userInfo: User = this.currentUserService.getCurrentUser();
  
  /**
   * Sign in to the user account
   * @param user 
   */
  signIn(user: User): void {
    const inputUser = user;

    if (this.checkIfEmailValid(user.email)) {
      this.userService.getUserByEmail(inputUser.email).subscribe( // sends request to get user associated with given mail
        (userResponse: User) => {
          console.log('User data: ', userResponse);

          const fetchedUser: User = userResponse; // creates a user from server response

          if (fetchedUser) {
            const password_hash: string = sha512.hex(inputUser.password);
            console.log(password_hash);
            console.log(fetchedUser.password);

            if (password_hash === fetchedUser.password) {
              console.log("Success!");

              this.currentUserService.setCurrentUser(fetchedUser);

              if (this.isAdmin(fetchedUser))
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

