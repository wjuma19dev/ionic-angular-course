import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import Place from '../places.model';
import { PlacesServices } from '../places.service';

// RXJS
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  offers: Place[];
  offersSub: Subscription;

  constructor(
    private placesSvs: PlacesServices,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.offersSub = this.placesSvs.places
      .subscribe((places: Place[]) => {
        this.offers = places;
      });
  }

  onEdit(sliding: IonItemSliding, placeId: string): void {
    sliding.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', placeId]);
  }

  ngOnDestroy(): void {
    if (this.offersSub) {
      this.offersSub.unsubscribe();
    }
  }

}
