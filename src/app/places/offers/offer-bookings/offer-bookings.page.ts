import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Place from '../../places.model';
import { PlacesServices } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  public place: Place;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private placeSvc: PlacesServices
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

}
