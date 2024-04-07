import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';
import { CurrentUserService } from '../services/current.user.service';

import { FormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { GiftEditService } from '../services/gift-edit.service';


@Component({
  standalone: true,
  selector: 'app-gift-detail-edit',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './gift-edit.component.html',
  styleUrls: [ './gift-detail.component.css' ]
})
export class GiftEditComponent implements OnInit {

  gift : Gift = this.giftEditService.getCurrentGift();

  giftId : number = -1;

  paramsSubscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private giftService: GiftService,
    private location: Location,
    private router: Router,
    private currUserService : CurrentUserService,
    private giftEditService : GiftEditService) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params=> {
      this.giftId = params['id'];
      this.getGift(this.giftId);
    });
    this.checkUser();
    
  }

  getGift(id : number) {
  
    this.giftService.getGift(id)
      .subscribe(gift => {
        if (gift) {
          this.gift = gift;
        } else {
          this.router.navigate(['/404']);
        }
      })
  }

  
  checkUser() :void {
    if(!this.currUserService.isAdmin()) {
      this.router.navigate(['../login']);
    }
  }

  /**
   * Change view to user's previous route
   */
  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  save(): void {
    if (this.gift) {
      this.giftService.updateGift(this.gift)
        .subscribe(() => {
          this.giftEditService.setCurrentGift(this.gift);
          this.goBack();
          console.log("Updated Gift: ", this.giftEditService.getCurrentGift());
        });
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
