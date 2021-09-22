import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Place from '../../places.model';
import { PlacesServices } from '../../places.service';

// RXJS
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {

  place: Place;
  placeSub: Subscription;

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
        this.placeSub = this.placeSvc.findOne(paramMap.get('placeId'))
          .subscribe((place: Place) => {
            this.place = place;
          }); 
      });
  }

  ngOnDestroy(): void {
    if(this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
