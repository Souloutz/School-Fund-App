import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private giftService : GiftService) {}

  gifts : Gift[] = [];

  ngOnInit() :void {
    this.getGifts();
  }

  selected(object: any): void {
    console.log('Item clicked:', object);
  } 

  getGifts()
  {
    this.giftService.getGifts().subscribe((gifts : Gift[]) => this.gifts = gifts);
  }

  addGift(name : string, description : string, passedPrice : string) : void{
    if(!name){return;}
    if(!description){return;}
    if(!passedPrice){return;}

    const price : number = parseInt(passedPrice);

    console.log("Passed info: ",name,description,price);

    this.giftService.addGift({ id: 0,
                               name, 
                               description, 
                               price,
                               priority:0,
                               amount_needed:0})
    .subscribe(gift => {
      this.gifts.push(gift);
      console.log(gift);
    });
  }

  deleteGift(gift : Gift) {
    this.gifts = this.gifts.filter(g => g!== gift);
    this.giftService.deleteGift(gift.id).subscribe();
  }
}
