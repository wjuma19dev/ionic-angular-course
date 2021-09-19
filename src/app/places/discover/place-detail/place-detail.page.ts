import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Place from '../../places.model';
import { PlacesServices } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  public place: Place;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  onBookPlace() {
    console.log('Book place');
  }

}
