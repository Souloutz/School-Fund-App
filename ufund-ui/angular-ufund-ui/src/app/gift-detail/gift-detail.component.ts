import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';

import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-gift-detail',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './gift-detail.component.html',
  styleUrls: [ './gift-detail.component.css' ]
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

  /**
   * Change view to user's previous route
   */
  goBack(): void {
    this.location.back();
  }
}
