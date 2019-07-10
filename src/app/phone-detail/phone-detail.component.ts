import { Component, OnInit, Input } from '@angular/core';
import { Phone } from '../model/phone';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from '../phone.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
})
export class PhoneDetailComponent implements OnInit {
  selectedPhone:Phone;
  constructor(
    private route: ActivatedRoute,
    private phoneService: PhoneService,
    private location: Location
  ) { }

  getPhone():void {
    const id = +this.route.snapshot.paramMap.get('id'); //Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
    this.phoneService.getPhone(id).subscribe(phone => this.selectedPhone = phone);
  }

  save():void {
    this.phoneService.updatePhone(this.selectedPhone).subscribe(() => this.goBack());
  }

  goBack():void {
    this.location.back();
  }

  ngOnInit():void {
    this.getPhone();
  }

}
