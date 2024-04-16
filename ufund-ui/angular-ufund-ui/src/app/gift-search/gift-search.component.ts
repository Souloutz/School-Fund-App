import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CurrentUserService } from '../services/current.user.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [
    AsyncPipe,
    NgFor,
    RouterLink
  ],
  templateUrl: './gift-search.component.html',
  styleUrls: [ '../gifts/gifts.component.css',
               './gift-search.component.css' ]
})
export class GiftSearchComponent implements OnInit {

  gifts$!: Observable<Gift[]>;

  private searchTerms = new Subject<string>();

  constructor(private currUserService: CurrentUserService,
              private giftService: GiftService,
              private userService: UserService,
              private router: Router,
              ) {}

  // push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.gifts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.giftService.searchGifts(term)),
    );
  }

  /**
   * Add the selected gift to the cart
   * @param gift 
   */
  addToCart(gift: Gift, passedAmount : string): void {

    passedAmount = passedAmount == "" ? "1" : passedAmount;

    if(this.currUserService.isUserLoggedIn()) {
      console.log("Gift info: ", gift);

      let amount = parseInt(passedAmount);
  
      if(this.isAmountOver(gift, amount)) {
        amount = gift.amount_needed;
      }

      this.userService.addItemToCart(this.currUserService.getCurrentUser().email,
                                     this.giftService.createItemFromGiftId(gift.id, gift.name, amount))
                                     .subscribe((user: User) => {
                                      this.currUserService.setCurrentUser(user);
                                      console.log('Success!', user.id)});
      
      console.log(this.currUserService.getCurrentUser().cart.length);
    } 
    
    else 
      this.router.navigate(['/login']);
  }

  isAmountOver(gift: Gift, amount: number) {
    return gift.amount_needed < amount;
  }
}
