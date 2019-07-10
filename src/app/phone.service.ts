import { Injectable } from '@angular/core';
import { Phone } from './model/phone';
import { PHONES } from './mock-phones';
import { Observable, of, from } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private phoneUrl = 'api/phones'; //URL to web-api
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  private log(message: string) {
    this.messageService.add(`Phone Service: ${message}`);
  } 

  //DEPRECATED
  // getPhones(): Observable<Phone[]> {
  //   this.messageService.add("Phone Service: fetched phones");
  //   return of(PHONES);
  // }

  getPhones():Observable<Phone[]> {
    return this.http.get<Phone[]>(this.phoneUrl)
    .pipe(
      tap(_ => this.log('fetched phones')),
      catchError(this.handleError<Phone[]>('getPhones',[]))
    );
  }
  
  // DEPRECATED
  // getPhone(id: number): Observable<Phone> {
  //   this.messageService.add(`PhoneService: fetched phone id = ${id}`);  //Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
  //   return of(PHONES.find(phone => phone.id === id));
  // }

  
  getFunc<T>() {

  }
  getPhone404<Data>(id: number):Observable<Phone> {
    const url = `${this.phoneUrl}/${id}`;
    return this.http.get<Phone[]>(this.phoneUrl)
    .pipe(
        map(phones => phones[0]),
        tap(p => {
          const outcome = p ? 'fetched' : 'did not found';
          this.log(`${outcome} phone id = ${id}`);
        }),
        catchError(this.handleError<Phone>(`getPhone id=${id}`))
      )
  }


  getPhone(id: number): Observable<Phone> {
    const url = `${this.phoneUrl}/${id}`;
    return this.http.get<Phone>(url)
    .pipe(
      tap(_ => this.log(`fetched phone with id = ${id}`)),
      catchError(this.handleError<Phone>(`getPhone id = ${id}`))
    );
  }

  updatePhone(phone: Phone): Observable<any> {
    return this.http.put(this.phoneUrl, phone, httpOptions)
    .pipe(
      tap(_ => this.log(`updated phone with id = ${phone.id}`)),
      catchError(this.handleError<any>('Updated phone'))
    );
  }
  
  addPhone(phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(this.phoneUrl, phone, httpOptions)
    .pipe(
      tap((newPhone: Phone) => this.log(`added phone w/ id=${newPhone.id}`)),
      catchError(this.handleError<Phone>('Added phone'))
    );
  }

  deletePhone(phone: Phone | number): Observable<Phone> {
    const id = typeof phone === 'number' ? phone : phone.id;
    const url = `${this.phoneUrl}/${id}`;
    return this.http.delete<Phone>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`delete phone with id = ${id}`)),
      catchError(this.handleError<Phone>('Delete phone'))
    );
  }

  searchPhones(term: string): Observable<Phone[]> {
    if(!term.trim()) {
      //empty result
      return of([]);
    }
    return this.http.get<Phone[]>(`${this.phoneUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`search phones with the name = ${term}`)),
      catchError(this.handleError<Phone[]>('search Phones',[]))
    );
  }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
