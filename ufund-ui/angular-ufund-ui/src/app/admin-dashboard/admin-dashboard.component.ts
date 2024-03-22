import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';
import { CurrentUserService } from '../services/current.user.service';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { GiftEditService } from '../services/gift-edit.service';

import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [
    NgFor,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  gifts : Gift[] = [];

  giftSubscription : Subscription = new Subscription;

  constructor(private giftService : GiftService,
              private currUserService : CurrentUserService,
              private router : Router,
              private giftEditService : GiftEditService) {}



  ngOnInit() :void {
    this.checkUser();
    this.getGifts();
  }

  selected(object: any): void {
    console.log('Item clicked:', object);
  } 

  checkUser() :void {
    if(!this.currUserService.isAdmin()) {
      this.router.navigate(['login']);
    }
  }

  getGifts()
  {
    this.giftService.getGifts().subscribe((gifts : Gift[]) => this.gifts = gifts);
  }

  addGift(name : string, description : string, passedPrice : string, passedAmount: string) : void{
    if(!name){return;}
    if(!description){return;}
    if(!passedPrice){return;}
    if(!passedAmount){return;}

    const price : number = parseFloat(passedPrice);

    const amount_needed : number = parseInt(passedAmount);

    console.log("Passed info: ",name,description,price);

    this.giftService.addGift({ id: 0,
                               name, 
                               description, 
                               price,
                               priority:0,
                               amount_needed:amount_needed})
    .subscribe(gift => {
      this.gifts.push(gift);
      console.log(gift);
    });
  }

  deleteGift(gift : Gift) {
    this.gifts = this.gifts.filter(g => g!== gift);
    this.giftService.deleteGift(gift.id).subscribe();
  }


  logOut() : void {
    this.currUserService.logOut();
  }

  getDetail(gift : Gift) : void {
    console.log("clicked on detail");
    this.giftSubscription.unsubscribe();
    this.giftEditService.setCurrentGift(gift);

    const index = this.gifts.findIndex(element => element.id === gift.id);

    if(index !== -1) {
      this.giftSubscription = this.giftEditService.currentGift
      .subscribe(currGift => this.gifts[index] = currGift);
    }

    this.router.navigate(['admin-dashboard/detail-edit',gift.id]);
  }


  ngOnDestroy() {
    this.giftSubscription.unsubscribe();
  }
}
