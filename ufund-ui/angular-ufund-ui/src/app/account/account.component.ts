import { Component } from '@angular/core';

import { CurrentUserService } from '../services/current.user.service';

import { User } from '../model/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-account',
  imports: [
    RouterLink
  ],
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
