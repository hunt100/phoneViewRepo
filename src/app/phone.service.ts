import { Injectable } from '@angular/core';
import { Phone } from './entity/phone';
import { PHONES } from './mock-phones';
import { Observable, of, from } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private phoneUrl = 'api/phones'; //URL to web-api

  private log(message: string) {
    this.messageService.add(`Phone Service: ${message}`);
  } 

  //DEPRECATED
  // getPhones(): Observable<Phone[]> {
  //   this.messageService.add("Phone Service: fetched phones");
  //   return of(PHONES);
  // }

  getPhones():Observable<Phone[]> {
    return this.http.get<Phone[]>(this.phoneUrl);
    // .pipe(
    //   catchError(this.handleError<Phone[]>('getPhones',[]))
    // );
  }
  //TODO Http CRUD with remote server

  getPhone(id: number): Observable<Phone> {
    this.messageService.add(`PhoneService: fetched phone id = ${id}`);  //Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    return of(PHONES.find(phone => phone.id === id));
  }
  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }


}
