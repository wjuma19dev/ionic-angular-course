import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Place from '../../places.model';
import { PlacesServices } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Place;
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private placeSvc: PlacesServices
  ) {}

  ngOnInit() {

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (!paramMap.has('placeId')) {
          this.router.navigateByUrl('/places/tabs/offers');
        }
        this.place = this.placeSvc.findOne(paramMap.get('placeId'));
      });

    this.form = this.fb.group({
      title: [this.place.title, [Validators.required]],
      description: [this.place.description, [Validators.required, Validators.maxLength(180)]]
    });
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

}
