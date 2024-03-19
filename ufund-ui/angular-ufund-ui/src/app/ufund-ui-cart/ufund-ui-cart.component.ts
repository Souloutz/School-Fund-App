import { Component } from '@angular/core';

import { CurrentUserService } from '../current.user.service';
import { GiftService } from '../gift.service';
import { Item } from '../model/item';

import { UserService } from '../user.service';

@Component({
  selector: 'app-ufund-ui-cart',
  templateUrl: './ufund-ui-cart.component.html',
  styleUrl: './ufund-ui-cart.component.css'
})
export class UfundUiCartComponent {

  constructor (private currUserService : CurrentUserService,
               private giftService : GiftService,
               private userService : UserService) {}

  gifts = this.giftService.getGifts();

  currentUser = this.currUserService.getCurrentUser();

  cart = this.currentUser.cart;


  removeItem(item : Item) {
    this.userService.removeItemFromCart(this.currentUser.email, item)
    .subscribe(user => {
      this.currUserService.setCurrentUser(user);
      this.currentUser = this.currUserService.getCurrentUser();
      console.log("Success!, ", this.currentUser.cart);
    })
  }
}
