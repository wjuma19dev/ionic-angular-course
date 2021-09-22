import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesServices } from '../../places.service';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private placeSvc: PlacesServices,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(180)]],
      price: ['', [Validators.required, Validators.min(1)]],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    const {title, price, description, dateFrom, dateTo} = this.form.value;

    // Crear un loading
    this.loadingCtrl.create({ spinner: 'circles', message: 'Create place, please wait ...' })
      .then(loading => {
        loading.present();
        this.placeSvc.addPlace(title, price, description, dateFrom, dateTo)
        .subscribe(() => {
          loading.dismiss();
          this.form.reset();
          this.router.navigate(['/', 'places', 'tabs', 'offers']);
        });
      });


  }

}
