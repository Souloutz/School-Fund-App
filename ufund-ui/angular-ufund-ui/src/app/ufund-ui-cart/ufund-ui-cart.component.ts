import { Component } from '@angular/core';

import { Item } from '../model/item';
import { CurrentUserService } from '../current.user.service';

@Component({
  selector: 'app-ufund-ui-cart',
  templateUrl: './ufund-ui-cart.component.html',
  styleUrl: './ufund-ui-cart.component.css'
})
export class UfundUiCartComponent {

  constructor (private currUserService : CurrentUserService) {}

  cart = this.currUserService.getCurrentUser().cart;
}
