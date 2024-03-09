import { Injectable } from '@angular/core';
import { User } from './model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private baseUser : BehaviorSubject<User> = new BehaviorSubject<User>({
  //the base user that will be changed eventually
  //so it can be used in the html component
  id: -1,//initialized 
  username: '',
  password: '',
  email: '',
  cart: [],
  orders: [],
  })

  currentUser : BehaviorSubject<User> = this.baseUser;

  constructor() { }

  setCurrentUser(user: BehaviorSubject<User>): void {
    this.currentUser = user;
  }

  getCurrentUser(): BehaviorSubject<User> {
    return this.currentUser;
  }

  clearCurrentUser(): void {
    this.currentUser = this.baseUser;
  }

      
}