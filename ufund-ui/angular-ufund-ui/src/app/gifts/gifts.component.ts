import { Component, OnInit } from '@angular/core';

import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';
import { UserService } from '../services/user.service';
import { CurrentUserService } from '../services/current.user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-gifts',
  imports: [
    NgFor, RouterLink
  ],
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
  addToCart(gift : Gift): void {
    if(this.currUserService.isUserLoggedIn()) {
      console.log("Gift info: ", gift);

      this.userService.addItemToCart(this.currUserService.getCurrentUser().email,
                                     this.giftService.createItemFromGiftId(gift.id, gift.name, 1)).subscribe(
                                        (user: User) => {this.currUserService.setCurrentUser(user);
                                                 console.log('Success!', user.id)});
      
      console.log(this.currUserService.getCurrentUser().cart.length);
    } 
    
    else 
      this.router.navigate(['/login']);
  }
}
