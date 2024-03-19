import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Gift } from '../model/gift';
import { GiftService } from '../gift.service';
import { CurrentUserService } from '../current.user.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ufund-ui-search',
  templateUrl: './ufund-ui-search.component.html',
  styleUrls: [ './ufund-ui-search.component.css' ]
})
export class GiftSearchComponent implements OnInit {
  gifts$!: Observable<Gift[]>;
  private searchTerms = new Subject<string>();

  constructor(private giftService: GiftService,
              private currUserService : CurrentUserService,
              private userService : UserService,
              private router : Router) {}

  // Push a search term into the observable stream.
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
