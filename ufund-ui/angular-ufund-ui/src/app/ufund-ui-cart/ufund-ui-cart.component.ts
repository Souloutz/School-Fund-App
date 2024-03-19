import { Component } from '@angular/core';

import { CurrentUserService } from '../current.user.service';
import { GiftService } from '../gift.service';
import { Item } from '../model/item';

import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-ufund-ui-cart',
  templateUrl: './ufund-ui-cart.component.html',
  styleUrl: './ufund-ui-cart.component.css'
})
export class UfundUiCartComponent {

  cart : Item[] = [];
  currentUser : User = this.currUserService.getBaseUser();

  constructor (private currUserService : CurrentUserService,
               private giftService : GiftService,
               private userService : UserService) {}

  ngOnInit() : void {
    this.currentUser =this.currUserService.getCurrentUser();
    this.getCartItems();
  }

  getCartItems() {
    this.cart = this.currentUser.cart;
  }

  gifts = this.giftService.getGifts();

  removeItem(item : Item) {
    this.cart = this.cart.filter(i=> i !== item);

    this.userService.removeItemFromCart(this.currentUser.email, item)
    .subscribe(user => {
      this.currUserService.setCurrentUser(user);
      this.currentUser = this.currUserService.getCurrentUser();
      console.log("Success!, ", this.currentUser.cart);
    })
  }
}
