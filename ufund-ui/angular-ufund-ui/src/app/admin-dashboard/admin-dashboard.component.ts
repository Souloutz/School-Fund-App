import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';
import { CurrentUserService } from '../services/current.user.service';
import { Router } from '@angular/router';

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

  constructor(private giftService : GiftService,
              private currUserService : CurrentUserService,
              private router : Router) {}

  gifts : Gift[] = [];

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

  addGift(name : string, description : string, passedPrice : string) : void{
    if(!name){return;}
    if(!description){return;}
    if(!passedPrice){return;}

    const price : number = parseFloat(passedPrice);

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


  logOut() : void {
    this.currUserService.logOut();
  }
}
