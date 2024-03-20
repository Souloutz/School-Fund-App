import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
               private userService: UserService) {}

  gifts = this.giftService.getGifts();

  currentUser = this.currentUserService.getCurrentUser();
  cart = this.currentUser.cart;

  removeItem(item : Item) {
    this.userService.removeItemFromCart(this.currentUser.email, item)
      .subscribe((user: User) => {
        this.currentUserService.setCurrentUser(user);
        this.currentUser = this.currentUserService.getCurrentUser();
        console.log("Success!, ", this.currentUser.cart);
    })
  }
}
