import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Gift } from './model/gift';
import { MessageService } from './message.service';
import { Item } from './model/item';

@Injectable({ providedIn: 'root', })
export class GiftService {
  private giftsURL = 'http://localhost:8080/gifts'; // REST API link

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getGifts(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.giftsURL)
      .pipe(
        tap(_ => this.log('fetched gifts')),
        catchError(this.handleError<Gift[]>('getGifts', []))
      );
  }

/** GET gift by id. Return `undefined` when id not found */
  getGiftNo404<Data>(id: number): Observable<Gift> {
    const url = `${this.giftsURL}/?id=${id}`;
    return this.http.get<Gift[]>(url)
      .pipe(
        map(gifts => gifts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} gift id=${id}`);
        }),
        catchError(this.handleError<Gift>(`getGift id=${id}`))
      );
  }

  /** GET gift by id. Will 404 if id not found */
  getGift(id: number): Observable<Gift> {
    const url = `${this.giftsURL}/${id}`;
    return this.http.get<Gift>(url).pipe(
      tap(_ => this.log(`fetched gift id=${id}`)),
      catchError(this.handleError<Gift>(`getGift id=${id}`))
    );
  }

    /** GET gift by email. Will 404 if id not found */
  getGiftByEmail(email: string): Observable<Gift> {
    const url = `${this.giftsURL}/email/?email=${email}`;
    return this.http.get<Gift>(url).pipe(
      tap(_ => this.log(`fetched gift email=${email}`)),
      catchError(this.handleError<Gift>(`getGift email=${email}`))
    );
  }

  /* GET gifts whose name contains search term */
  searchGifts(term: string): Observable<Gift[]> {
    if (!term.trim()) {
      // if not search term, return empty gift array.
      return of([]);
    }
    return this.http.get<Gift[]>(`${this.giftsURL}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found gifts matching "${term}"`) :
         this.log(`no gifts matching "${term}"`)),
      catchError(this.handleError<Gift[]>('searchGifts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new gift to the server */
  addGift(gift: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.giftsURL, gift, this.httpOptions).pipe(
      tap((newGift: Gift) => this.log(`added gift w/ id=${newGift.id}`)),
      catchError(this.handleError<Gift>('addGift'))
    );
  }

  /**
   * 
   * @param gift 
   * @param amount 
   * @returns an Item object using the amount and the gift
   */
  createItemFromGift(gift : Gift, amount: number) : Item {
    return {id: gift.id,amount};
  }

  /** DELETE: delete the gift from the server */
  deleteGift(id: number): Observable<Gift> {
    const url = `${this.giftsURL}/${id}`;

    return this.http.delete<Gift>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted gift id=${id}`)),
      catchError(this.handleError<Gift>('deleteGift'))
    );
  }

  /** PUT: update the gift on the server */
  updateGift(gift: Gift): Observable<any> {
    return this.http.put(this.giftsURL, gift, this.httpOptions).pipe(
      tap(_ => this.log(`updated gift id=${gift.id}`)),
      catchError(this.handleError<any>('updateGift'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for gift consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a giftService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GiftService: ${message}`);
  }

}

