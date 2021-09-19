import { Injectable } from "@angular/core";
import { Booking } from "./bookings.model";

@Injectable({providedIn: 'root'})
export class BookingsService {

  private _bookings: Booking[] = [
    {
      id: 'b1',
      placeId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      placeTitle: 'Manhattan Mansion',
      userId: '2',
      guestNumber: 2
    }
  ];
  
  constructor() {}

  get bookings() {
    return [...this._bookings];
  }
}