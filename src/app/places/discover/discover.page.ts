import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Place from '../places.model';
import { PlacesServices } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  public places: Place[];

  constructor(
    private placesSvc: PlacesServices,
    private router: Router
  ) { }

  ngOnInit() {
    this.places = this.placesSvc.places;
  }

  onShowMore(placeId) {
    this.router.navigate(['/', 'places', 'tabs', 'discover', placeId])
  }

}
