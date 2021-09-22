import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  loadedBookings: Booking[];
  private bookingsSub: Subscription;

  constructor(
    private bookingSvc: BookingsService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.bookingsSub = this.bookingSvc.bookings
      .subscribe((bookings: Booking[]) => {
        this.loadedBookings = bookings;
      });
  }

  onDelete(bookingId: string, sliding: IonItemSliding) {
    sliding.close();
    this.loadingCtrl.create({spinner: 'circles', message: 'Delete booking, please wait...'})
      .then(loading => {
        loading.present();
        this.bookingSvc.cancelBooking(bookingId)
        .subscribe(() => {
          loading.dismiss();
        });
      })
  }

  ngOnDestroy(): void {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

}
