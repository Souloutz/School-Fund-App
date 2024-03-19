import { Component } from '@angular/core';

import { Item } from '../model/item';
import { CurrentUserService } from '../current.user.service';
import { GiftService } from '../gift.service';

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
}
