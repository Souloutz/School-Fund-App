import { Component } from '@angular/core';

import { CurrentUserService } from '../current.user.service';
import { GiftService } from '../gift.service';
import { Gift } from '../model/gift';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-ufund-ui-cart',
  templateUrl: './ufund-ui-cart.component.html',
  styleUrl: './ufund-ui-cart.component.css'
})
export class UfundUiCartComponent {

  constructor (private currUserService : CurrentUserService,
               private giftService : GiftService) {}

  gifts = this.giftService.getGifts();

  cart = this.currUserService.getCurrentUser().cart;

  getGift(id : number) : Observable<string>{
    return this.giftService.getGift(id).pipe(tap(gift => {console.log(gift.name);}),
                                             map((gift : Gift) => gift.name));
  }
}
