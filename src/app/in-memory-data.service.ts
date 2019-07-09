import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Phone } from './entity/phone';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService extends InMemoryDbService{
  createDb(){
    const phones: Phone[] = [
      {id:11, name: "Meizu a2", price: 12.50},
      {id:12, name: "Iphone 6", price: 25},
      {id:13, name: "Nokia 3310", price: 3.75},
      {id:14, name: "Windows phone", price: 12},
      {id:15, name: "Samsung galaxy", price: 8.25}
    ];
    return{phones};
  }
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(phones: Phone[]):number {
    return phones.length > 0 ? Math.max(...phones.map(phone => phone.id)) + 1 : 11;
  }
}
