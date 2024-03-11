import { Component } from '@angular/core';

import { UserService } from "../user.service";
import { CurrentUserService } from '../current.user.service';
import { Router } from '@angular/router';

import { User } from '../model/user';

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

  userInfo : User = this.currentUserService.getCurrentUser();
  
  
  signIn(user : User) : void
  {
    const userInput = user;

      this.userService.getUserByEmail(userInput.email).subscribe(//sends request for 
      //to get the User with the email given by the input
        (emailResponse: User) =>
        {
          console.log('User data: ', emailResponse);

          const userResponse : User = emailResponse;

          if(userResponse) {
            if(userInput.password === userResponse.password)//if they are the exact same
            {
              console.log("Success!");
              this.currentUserService.setCurrentUser(userResponse);

              //checks if the user is an admin
              if(this.isAdmin(userResponse)) {
                this.router.navigate(['/admin-dashboard'])
              } else { this.router.navigate(['']); }
            }
            else {
              console.log("Wrong password");
            }
          }
        }
      );
  }

  /**
   * 
   * @param user 
   * @returns true if the user is the admin
   */
  isAdmin(user : User) : boolean {
    return (user.email == 'admin@google.com');
  }
}

