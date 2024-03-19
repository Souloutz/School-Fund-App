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

  //adds the selected gift to the cart
  addToCart(gift : Gift) {
    if(this.currUserService.isUserLoggedIn()) {
      this.userService.addItemToCart(this.currUserService.getCurrentUser().id,
                                     this.giftService.createItemFromGift(gift, 1));
    } else {
      this.router.navigate(['/login']);
    }

  }
}
