import { Injectable } from "@angular/core";

// Models
import Place from "./places.model";

// Services
import { AuthService } from "../auth/auth.service";

// 3er Party Libraries
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

// RXJS
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlacesServices {

  private _places = new BehaviorSubject<Place[]>([
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
]);

  constructor(private authSvc: AuthService) {}

  public get places() {
    return this._places.asObservable();
  }

  public findOne(placeId: string) {
    return this.places
      .pipe(
        take(1),
        map((places: Place[]) => {
          return {..._.find(places, (p: Place) => p.id === placeId)};
        })
      );
  }

  addPlace(title: string, price: number, description: string, dateFrom: string, dateTo: string) {

    // Recibe la data que ingresa desde el formulario y crea la nueva instancia
    const newPlace = new Place(uuidv4(), title, description, 'no-image.jpeg', price, new Date(dateFrom), new Date(dateTo), this.authSvc.userId);

    // Nos suscribimos solo una vez a la subscripcion de places para asi extraer la lista de estos
    // agregar el nuevo y posteriormente emitir un nuevo evento con la lista modificada.
    return this.places
      .pipe(
        take(1),
        delay(1000),
        tap((places: Place[]) => {
          this._places.next(places.concat(newPlace));
        })
      );

  }

  updatePlace(placeId: string, title: string, description: string): Observable<Place[]> {
    return this.places
      .pipe(
        take(1),
        delay(1000),
        tap((places: Place[]) => {

          // Logica de la actualizacion del place
          const placeIndex = _.findIndex(places, {'id': placeId});
          const updatedPlace = [...places];
          const oldPlace = places[placeIndex];
          updatedPlace[placeIndex] = new Place(
            oldPlace.id,
            title,
            description,
            oldPlace.imageUrl,
            oldPlace.price,
            oldPlace.avaliableFrom,
            oldPlace.avaliableTo,
            oldPlace.userId
          );
          this._places.next(updatedPlace);
        })
      );
  }

}
