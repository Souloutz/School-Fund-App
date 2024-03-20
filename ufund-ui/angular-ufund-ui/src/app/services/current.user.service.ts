import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

/**
 * As services are singleton and only one of it is instantiated
 * Can only support one client at a time
 * 
 * Needs to be fixed (Sprint 3)
 */
@Injectable({ providedIn: 'root' })
export class CurrentUserService {

  constructor(private router : Router) {}
  
  private baseUser: User = {
    //the base user that will be changed eventually so it can be used in the html component
    id: -1, // uninitialized 
    username: '',
    password: '',
    email: '',
    cart: [],
    orders: [],
  };

  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(this.baseUser);

  /**
   * Set the current user of the website
   * @param user 
   */
  setCurrentUser(user: User): void {
    this.currentUser.next(user);
  }

  /**
   * Get the current user
   * @returns current user 
   */
  getCurrentUser(): User {
    return this.currentUser.getValue();
  }

  /**
   * Clear the current user
   */
  clearCurrentUser(): void {
    this.currentUser.next(this.baseUser);
  }

  /**
   * Get the base user
   * @returns base user 
   */
  getBaseUser(): User {
    return this.baseUser;
  }

  /**
   * Check if a user is logged in
   * @returns true if a user is logged in
   *          false if not
   */
  isUserLoggedIn() : boolean {
    return this.currentUser.getValue().id != -1;
  }

  logOut() : void {
    this.clearCurrentUser();
    this.router.navigate(['']);
  }

  
  /**
   * Check if a user is an admin
   * @param user 
   * @returns true if the user is the admin
   */
  isAdmin(): boolean {
    // TODO - update getting of admin email through REST API call instead
    return (this.getCurrentUser().email == 'admin@google.com');
  }
}