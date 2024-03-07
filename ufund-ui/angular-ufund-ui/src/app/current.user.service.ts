import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser: User | null = null;

  constructor() { }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  clearCurrentUser(): void {
    this.currentUser = null;
  }

  
}