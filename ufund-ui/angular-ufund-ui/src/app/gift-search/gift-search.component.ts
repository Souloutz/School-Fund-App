import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Gift } from '../model/gift';
import { GiftService } from '../services/gift.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [
    AsyncPipe,
    NgFor,
    RouterLink
  ],
  templateUrl: './gift-search.component.html',
  styleUrls: [ './gift-search.component.css' ]
})
export class GiftSearchComponent implements OnInit {

  gifts$!: Observable<Gift[]>;

  private searchTerms = new Subject<string>();

  constructor(private GiftService: GiftService) {}

  // push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.gifts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.GiftService.searchGifts(term)),
    );
  }
}
