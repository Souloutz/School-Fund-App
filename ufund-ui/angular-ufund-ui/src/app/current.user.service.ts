import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser : User = {//the base user that will be changed eventually
  //so it can be used in the html component
  id: -1,//initialized 
  username: '',
  password: '',
  email: '',
  cart: [],
  orders: [],
}
  constructor() { }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  clearCurrentUser(): void {
    this.currentUser = {//the base user that will be changed eventually
      //so it can be used in the html component
      id: -1,//initialized 
      username: '',
      password: '',
      email: '',
      cart: [],
      orders: [],
    };
  }

      
}