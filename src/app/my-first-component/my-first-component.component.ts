import { Component, OnInit } from '@angular/core';
import { Phone } from '../entity/phone';
import { PhoneService } from '../phone.service';


@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.css']
})
export class MyFirstComponentComponent implements OnInit {

    phones: Phone[];

    // selectedPhone: Phone;

    // onSelect(phone: Phone):void {
    //   this.selectedPhone = phone;
    // }

    getPhones(): void {
      this.phoneService.getPhones().subscribe(phones => this.phones = phones); //<-Check this one
        
    }

  constructor(private phoneService: PhoneService /*SingleTone*/) { }

  ngOnInit() {
    this.getPhones();
  }

}
