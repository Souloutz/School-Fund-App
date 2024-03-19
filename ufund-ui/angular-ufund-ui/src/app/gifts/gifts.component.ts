import { Component, OnInit } from '@angular/core';

import { Gift } from '../model/gift';
import { GiftService } from '../gift.service';
import { UserService } from '../user.service';
import { CurrentUserService } from '../current.user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
  gifts: Gift[] = [];

  constructor(private giftService: GiftService,
              private userService : UserService,
              private currUserService : CurrentUserService,
              private router : Router) { }

  ngOnInit(): void {
    this.getGifts();
  }

  getGifts(): void {
    this.giftService.getGifts()
    .subscribe(gifts => this.gifts = gifts);
  }

  /**
   * Adds the selected gift to the cart
   * @param gift 
   */
  addToCart(gift : Gift) {
    if(this.currUserService.isUserLoggedIn()) {
      console.log("Gift info: ", gift);

      this.userService.addItemToCart(this.currUserService.getCurrentUser().email,
                                     this.giftService.createItemFromGiftId(gift.id, 1, gift.name)).subscribe(
                                        user => {this.currUserService.setCurrentUser(user);
                                                 console.log('Success!', user.id)});
      
      console.log(this.currUserService.getCurrentUser().cart.length);
    } else {
      this.router.navigate(['/login']);
    }

  }
}
