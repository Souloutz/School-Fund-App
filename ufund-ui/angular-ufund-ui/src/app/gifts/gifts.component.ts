import { Component, OnInit } from '@angular/core';

import { Gift } from '../model/gift';
import { GiftService } from '../gift.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class HeroesComponent implements OnInit {
  gifts: Gift[] = [];

  constructor(private giftService: GiftService) { }

  ngOnInit(): void {
    this.getGifts();
  }

  getGifts(): void {
    this.giftService.getGifts()
    .subscribe(gifts => this.gifts = gifts);
  }

}
