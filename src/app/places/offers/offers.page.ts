import { Component, OnInit } from '@angular/core';
import Place from '../places.model';
import { PlacesServices } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public places: Place[];

  constructor(private placesSvs: PlacesServices) { }

  ngOnInit() {
    this.places = this.placesSvs.places;
  }

}
