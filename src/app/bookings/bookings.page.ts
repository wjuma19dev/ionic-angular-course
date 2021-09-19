import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  loadedBookings: Booking[];

  constructor(
    private bookingSvc: BookingsService
  ) { }

  ngOnInit() {
    this.loadedBookings = this.bookingSvc.bookings;
  }

  onDelete(offerId: string, sliding: IonItemSliding) {
    console.log(`Delete offer with ID: ${offerId}`);
    sliding.close();
  }

}
