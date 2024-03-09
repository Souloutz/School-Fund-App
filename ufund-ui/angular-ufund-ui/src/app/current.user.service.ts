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

  setCurrentUser(user: User): void {

    this.currentUser.next(user);

  }

  getCurrentUser(): User {
    return this.currentUser.getValue();
  }

  clearCurrentUser(): void {
    this.currentUser = this.baseUser;
  }

      
}