import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';
import Place from '../places.model';
import { PlacesServices } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  public loadedPlaces: Place[];
  public listedLoadedPlaces: Place[];

  constructor(
    private placesSvc: PlacesServices,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadedPlaces = this.placesSvc.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  }

  onShowMore(placeId) {
    this.router.navigate(['/', 'places', 'tabs', 'discover', placeId])
  }

  onFilterUpdate(event) {
    console.log(event.detail);
  }

}
