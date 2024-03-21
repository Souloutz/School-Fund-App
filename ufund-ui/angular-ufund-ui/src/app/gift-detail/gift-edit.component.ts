import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';
import { CurrentUserService } from '../services/current.user.service';

import { FormsModule } from '@angular/forms';



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
export class GiftDetailComponent implements OnInit {
  gift: Gift | undefined;

  constructor(
    private route: ActivatedRoute,
    private giftService: GiftService,
    private location: Location,
    private router: Router,
    private currUserService : CurrentUserService
  ) {}

  ngOnInit(): void {
    this.getGift();
    this.checkUser();
  }

  getGift(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
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
    this.location.ngOnDestroy();
  }
}
