import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Place from '../../places.model';
import { PlacesServices } from '../../places.service';

import { LoadingController } from '@ionic/angular';

// RXJS
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  place: Place;
  placeSub: Subscription;
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private placeSvc: PlacesServices,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (!paramMap.has('placeId')) {
          this.router.navigateByUrl('/places/tabs/offers');
        }
        this.placeSub = this.placeSvc.findOne(paramMap.get('placeId'))
          .subscribe((place: Place) => {
            this.place = place;
          });
        });

    this.form = this.fb.group({
      title: [this.place.title, [Validators.required]],
      description: [this.place.description, [Validators.required, Validators.maxLength(180)]]
    });
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({spinner: 'circles', message: 'Updating place, please wait...'})
      .then(loading => {
        loading.present();
        this.placeSvc.updatePlace(this.place.id, this.form.value['title'], this.form.value['description'])
        .subscribe(() => {
          loading.dismiss();
          this.router.navigateByUrl('/places/tabs/offers');
        });
      })
  }

  ngOnDestroy(): void {
    if(this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
