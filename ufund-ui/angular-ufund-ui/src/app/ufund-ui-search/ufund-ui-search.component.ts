import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Gift } from '../model/gift';
import { GiftService } from '../gift.service';

@Component({
  selector: 'app-ufund-ui-search',
  templateUrl: './ufund-ui-search.component.html',
  styleUrls: [ './ufund-ui-search.component.css' ]
})
export class GiftSearchComponent implements OnInit {
  gifts$!: Observable<Gift[]>;
  private searchTerms = new Subject<string>();

  constructor(private GiftService: GiftService) {}

  // Push a search term into the observable stream.
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
