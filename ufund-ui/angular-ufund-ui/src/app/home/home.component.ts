import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GiftsComponent } from '../gifts/gifts.component';
import { GiftSearchComponent } from '../gift-search/gift-search.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    GiftsComponent,
    GiftSearchComponent,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
