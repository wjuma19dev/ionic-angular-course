import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import Place from '../../places.model';
import { PlacesServices } from '../../places.service';
import { BookingsService } from '../../../bookings/bookings.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../../../auth/auth.service';

// RXJS
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place: Place;
  isBookable: boolean = false;
  placeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private placeSvc: PlacesServices,
    private modalCtrl: ModalController,
    private bookingSvc: BookingsService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authSvc: AuthService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe(paramMap => {
        if (!paramMap.has('placeId')) {
          this.navCtrl.navigateBack('/places/tabs/discover');
        }
        this.placeSub = this.placeSvc.findOne(paramMap.get('placeId'))
          .subscribe((place: Place) => {
            this.place = place;
            this.isBookable = place.userId !== this.authSvc.userId;
          })
      });
  }

  onBookPlace() {
    this.actionSheetCtrl.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
      .then(actionSheet => {
        actionSheet.present();
      })
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {
        selectedPlace: this.place,
        selectedMode: mode
      }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(resultData => {
      if (resultData.role === 'confirm') {
        this.loadingCtrl.create({ spinner: 'circles', message: 'Booking place, please wait...' })
          .then(loading => {
            loading.present();
            const {firstName, lastName, guestNumber, startDate, endDate} = resultData.data;
            this.bookingSvc.addBooking(this.place.id, this.place.title, this.place.imageUrl, firstName, lastName, guestNumber, new Date(startDate), new Date(endDate))
            .subscribe(() => {
              loading.dismiss();
            });
          });
      }
    });
  }

  ngOnDestroy(): void {
    if(this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
