import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './model/user';
import { MessageService } from './message.service';
import { Gift } from './model/gift';
import { Item } from './model/item';

@Injectable({ providedIn: 'root', })
export class UserService {
  private usersURL = 'http://localhost:8080/users'; // REST API link

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /** GET user by email. Will 404 if email not found */
  getUser(email : string): Observable<User> {
    const url = `${this.usersURL}/${email}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${email}`)),
      catchError(this.handleError<User>(`getUser id=${email}`))
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersURL}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found users matching "${term}"`) :
         this.log(`no users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersURL, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  isEmailTaken(email : string) : Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getUser(email).subscribe(
        (user : User) => {
          if(user != null)
          {
            resolve(true);
            reject("email taken");
          } else {
            resolve(false);
            reject("email not taken");
          }
        })
      })
  }

  /**
   * adds the specified item to the user's cart
   * @param userEmail : email for the user
   * @param item : item to be added
   * @returns observable user object that was given by server
   */
  addItemToCart(userEmail: string, item: Item) {
    console.log("Item put id: ", item.id);
    console.log(`${this.usersURL}/${userEmail}/cart/`, item);
    return this.http.put<User>(`${this.usersURL}/${userEmail}/cart/`, item, this.httpOptions).pipe(
      tap((updatedUser: User) => this.log(`added item w/ id=${item.id}`)),
      catchError(this.handleError<User>('addItem'))
    );
  }

  /**
   * Removes the specified item from the user's cart
   * @param userEmail : email for the user
   * @param item : item to be removed
   * @returns observable user object given by server
   */
  removeItemFromCart(userEmail: string, item: Item) {
    console.log("Item post id: ", item.id);
    console.log(`${this.usersURL}/${userEmail}/cart/`, item);
    return this.http.post<User>(`${this.usersURL}/${userEmail}/cart/`, item, this.httpOptions).pipe(
      tap((updatedUser: User) => this.log(`added item w/ id=${item.id}`)),
      catchError(this.handleError<User>('addItem'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<User> {
    const url = `${this.usersURL}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersURL, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a userService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

}

