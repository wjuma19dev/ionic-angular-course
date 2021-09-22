import { Injectable } from "@angular/core";
import { Booking } from "./bookings.model";
import { AuthService } from '../auth/auth.service';

// 3er Party Library
import { v4 as uuidV4 } from 'uuid';
import * as _ from 'lodash';

// RXJS
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap, delay } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BookingsService {

  _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authSvc: AuthService) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(uuidV4(), placeId, this.authSvc.userId, placeTitle, placeImage, firstName, lastName, guestNumber, dateFrom, dateTo);
    return this.bookings
      .pipe(
        take(1),
        delay(1000),
        tap((bookings: Booking[]) => {
          this._bookings.next(bookings.concat(newBooking));
        })
      );
  }

  cancelBooking(bookingId: string): Observable<Booking[]> {
    return this.bookings
      .pipe(
        take(1),
        delay(1000),
        tap((bookings: Booking[]) => {
          this._bookings.next(_.filter(bookings, b => b.id !== bookingId));
        })
      );
  }
}
