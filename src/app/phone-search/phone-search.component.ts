import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Phone } from '../model/phone';
import { PhoneService } from '../phone.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-phone-search',
  templateUrl: './phone-search.component.html',
  styleUrls: ['./phone-search.component.css']
})
export class PhoneSearchComponent implements OnInit {
  phones$: Observable<Phone[]>;
  private searchItems = new Subject<string>();

  constructor(private phoneService: PhoneService) { }

  search(term:string):void {
    this.searchItems.next(term);
  }

  ngOnInit() {
    this.phones$ = this.searchItems.pipe(
      //wait 300ms until next search suggestion
      debounceTime(300),

      //dont try to make new search if the same with previous
      distinctUntilChanged(),

      //switch to the new search observable each time if search changed
      switchMap((term:string) => this.phoneService.searchPhones(term))
    )
  }

}
