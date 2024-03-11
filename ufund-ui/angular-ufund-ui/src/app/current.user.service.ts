import { Injectable } from '@angular/core';
import { User } from './model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private baseUser : User = {
  //the base user that will be changed eventually
  //so it can be used in the html component
  id: -1,//initialized 
  username: '',
  password: '',
  email: '',
  cart: [],
  orders: [],
  };

  currentUser : BehaviorSubject<User> = new BehaviorSubject<User>(this.baseUser);

  constructor() { }

  setCurrentUser(user: User): void {

    this.currentUser.next(user);

  }

  getCurrentUser(): User {
    return this.currentUser.getValue();
  }

  clearCurrentUser(): void {
    this.currentUser.next(this.baseUser);
    console.log("Cleared current user, id is now: " + this.currentUser.getValue().id);
  }


  /**
   * 
   * @returns true if a user is logged in
   */
  isUserLoggedIn() : boolean {
    return this.currentUser.getValue().id  != -1;
  }
}