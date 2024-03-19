import { Component } from '@angular/core';

import { UserService } from "../services/user.service";
import { CurrentUserService } from '../services/current.user.service';

import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ufund-ui-account',
  templateUrl: './ufund-ui-account.component.html',
  styleUrl: './ufund-ui-account.component.css'
})
export class UfundUiAccountComponent {

  constructor(
    private currentUserService : CurrentUserService,
    private userService : UserService,
    private router : Router) {}

    currUser : User = this.currentUserService.getCurrentUser();

    logOut() : void {
      try {
        this.currentUserService.clearCurrentUser();
        this.currUser = this.currentUserService.getCurrentUser();
        console.log("User logged out");
        this.router.navigate(['']);
      } catch (error) {
        console.log("Error logging out: ", error);
      }
    }
}
