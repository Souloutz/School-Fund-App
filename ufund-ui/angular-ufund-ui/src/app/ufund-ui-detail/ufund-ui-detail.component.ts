import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Gift } from '../model/gift';
import { GiftService } from '../gift.service';

@Component({
  selector: 'app-ufund-ui-detail',
  templateUrl: './ufund-ui-detail.component.html',
  styleUrls: [ './ufund-ui-detail.component.css' ]
})
export class GiftDetailComponent implements OnInit {
  gift: Gift | undefined;

  constructor(
    private route: ActivatedRoute,
    private giftService: GiftService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getGift();
  }

  getGift(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.giftService.getGift(id)
      .subscribe(gift => this.gift = gift);
  }

  goBack(): void {
    this.location.back();
  }
}
