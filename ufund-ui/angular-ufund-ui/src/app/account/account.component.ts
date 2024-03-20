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
      this.currentUserService.logOut();
    }
}
