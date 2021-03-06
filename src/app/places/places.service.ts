import { Injectable } from "@angular/core";
import Place from "./places.model";
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class PlacesServices {

  public _places: Place[] = [
    new Place(
      '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', 
      'Manhattan Mansion', 
      'In the heart of New York city', 
      'manhattan-city.jpg', 
      159.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
      'L\' Amour Toujours',
      'A romantic place in Paris',
      'amour-toujours.jpeg',
      156.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      'The Foggy Palace',
      'Not your average city trip!',
      'foggy-palace.jpeg',
      200.10,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    )
  ]; 

  public get places() {
    return [...this._places];
  }

  public findOne(placeId) {
    const place = {..._.find(this.places, p => p.id === placeId)};
    return place;
  }
}