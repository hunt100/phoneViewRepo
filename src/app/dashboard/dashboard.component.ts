import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../phone.service';
import { Phone } from '../model/phone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  phones: Phone[];
  getPhones():void {
    this.phoneService.getPhones().subscribe(phones => this.phones = phones.slice(1,5));
  }
  constructor(private phoneService:PhoneService) { }

  ngOnInit() {
    this.getPhones();
  }

}
