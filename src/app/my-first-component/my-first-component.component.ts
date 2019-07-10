import { Component, OnInit } from '@angular/core';
import { Phone } from '../model/phone';
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
    constructor(private phoneService: PhoneService /*SingleTone*/) { }

    getPhones(): void {
      this.phoneService.getPhones().subscribe(phones => this.phones = phones); //<-Check this one
        
    }

    add(name: string, price: number): void {
      name = name.trim();
      if(!name /*|| Number.isNaN(price)*/ || !price ) { return; } // check if number
      this.phoneService.addPhone({ name, price } as Phone)
      .subscribe(phone => {
        this.phones.push(phone);
      })
    }

    delete(phone: Phone):void {
      this.phones = this.phones.filter(f => f !== phone); // immediately delete from list on front end
      this.phoneService.deletePhone(phone).subscribe();
    }

  ngOnInit() {
    this.getPhones();
  }

}
