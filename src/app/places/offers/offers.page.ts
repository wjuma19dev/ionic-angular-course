import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import Place from '../places.model';
import { PlacesServices } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public places: Place[];

  constructor(
    private placesSvs: PlacesServices,
    private router: Router
  ) { }

  ngOnInit() {
    this.places = this.placesSvs.places;
  }

  onEdit(sliding: IonItemSliding, placeId: string) {
    console.log('Editing place!');
    sliding.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', placeId]);
  }

}
