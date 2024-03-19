import { Component } from '@angular/core';

import { UserService } from "../services/user.service";
import { CurrentUserService } from '../services/current.user.service';

import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router) {}

    currentUser: User = this.currentUserService.getCurrentUser();

    /**
     * Log out a user
     */
    logOut(): void {
      try {
        this.currentUserService.clearCurrentUser();
        this.currentUser = this.currentUserService.getCurrentUser();
        console.log("User logged out");
        this.router.navigate(['']);
      } 
      catch (error) {
        console.log("Error logging out: ", error);
      }
    }
}
