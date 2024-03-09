import { Component } from '@angular/core';

import { UserService } from "../user.service";
import { CurrentUserService } from '../current.user.service';

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

        console.log("Current user reset, id is now: ", this.currUser.id);

        this.router.navigate(['']);
      } catch (error) {
        console.log("Error logging out: ", error);
      }
    }
}
