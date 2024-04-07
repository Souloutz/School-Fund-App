import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { CurrentUserService } from '../services/current.user.service';
import { UserService } from '../services/user.service';
import { GiftService } from '../services/gift.service';
import { Item } from '../model/item';
import { User } from '../model/user';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor (private currentUserService: CurrentUserService,
               private giftService: GiftService,
               private userService: UserService,
               private router : Router) {}

  cart: Item[] = [];
  currentUser: User = this.currentUserService.getBaseUser();

  gifts = this.giftService.getGifts();

  ngOnInit(): void {
    if(!this.currentUserService.isUserLoggedIn())//if theyre not a user (or not logged in)
    {
      this.router.navigate(['login']);
    }
    this.currentUser = this.currentUserService.getCurrentUser();
    this.getCartItems();
  }

  getCartItems() {
    this.cart = this.currentUser.cart;
  }

  removeItem(item: Item) {
    this.cart = this.cart.filter(i=> i !== item);

    this.userService.removeItemFromCart(this.currentUser.email, item)
      .subscribe((user: User) => {
        this.currentUserService.setCurrentUser(user);
        this.currentUser = this.currentUserService.getCurrentUser();
        console.log("Success!, ", this.currentUser.cart);
    })
  }

  goHome()
  {
    this.router.navigate(['']);
  }

  getDetail(id : number) {
    this.router.navigate([`/detail/${id}`])
  }
}


