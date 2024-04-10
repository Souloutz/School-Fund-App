import { Component } from '@angular/core';

import { CurrentUserService } from '../services/current.user.service';
import { UserService } from '../services/user.service';

import { User } from '../model/user';
import { Router, RouterLink } from '@angular/router';

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-account',
  imports: [
    RouterLink,
    NgFor, 
    NgIf,
    FormsModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  constructor(private currentUserService: CurrentUserService,
              private router: Router,
              private userService : UserService) {}

    currentUser: User = this.currentUserService.getBaseUser(); 

    ngOnInit() {
    if(!this.currentUserService.isUserLoggedIn()) {
      this.router.navigate(["login"]);
    }
    this.currentUser = this.currentUserService.getCurrentUser();
    }

    saveUser(username : string) {
      this.currentUser.username = username;
      console.log("Updated User: ", this.currentUser);
      this.userService.updateUser(this.currentUser)
      .subscribe(updated => {
        this.currentUserService.setCurrentUser(updated);
      })
    }

    goHome() : void {
      this.router.navigate(['']);
    }

    logOut(): void {
      this.currentUserService.logOut();
    }
}
