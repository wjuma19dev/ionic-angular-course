import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import Place from '../../places.model';
import { PlacesServices } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  public place: Place;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private placeSvc: PlacesServices,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe(paramMap => {
        if (!paramMap.has('placeId')) {
          this.router.navigateByUrl('/places/tabs/discover');
        }
        this.place = this.placeSvc.findOne(paramMap.get('placeId'));
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
        console.log(resultData);
      }
    });
  }

}
