import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Place from '../places.model';
import { PlacesServices } from '../places.service';
import { AuthService } from '../../auth/auth.service';

// 3er Party Library
import * as _ from 'lodash';

// rxjs
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  loadedPlaces: Place[];
  loadedPlacesSubs: Subscription;
  relevantPlaces: Place[];
  listedLoadedPlaces: Place[];

  constructor(
    private placesSvc: PlacesServices,
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.loadedPlacesSubs = this.placesSvc.places
      .subscribe((places: Place[]) => {
        this.loadedPlaces = places;
        this.relevantPlaces = this.loadedPlaces;
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      })
  }

  onShowMore(placeId: string): void {
    this.router.navigate(['/', 'places', 'tabs', 'discover', placeId])
  }

  onFilterUpdate(event: any): void {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = _.filter(this.loadedPlaces, pl => pl.userId !== this.authSvc.userId);
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy(): void {
    if(this.loadedPlacesSubs) {
      this.loadedPlacesSubs.unsubscribe();
    }
  }

}
