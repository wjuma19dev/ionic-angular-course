import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import Place from 'src/app/places/places.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', {static: true}) form: NgForm;
  startDate: string;
  endDate: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    const avaliableFrom = new Date(this.selectedPlace.avaliableFrom);
    const avaliableTo = new Date(this.selectedPlace.avaliableTo);

    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        avaliableFrom.getTime() +
        Math.random() *
        (
          avaliableTo.getTime() -
          7*24*60*60*1000 - 
          avaliableFrom.getTime()
        )
      )
      .toISOString();
      this.endDate = new Date(
        new Date(this.startDate).getTime() +
        Math.random() *
        (
          new Date(this.startDate).getTime() +
          6*24*60*60*1000 -
          new Date(this.startDate).getTime()
        )
      )
      .toISOString();
    }
  }

  onBookPlace() {
    if (!this.form.valid ?? !this.datesValid()) {
      return;
    }
    this.modalCtrl.dismiss({
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: this.form.value['guest-number'],
      startDate: this.form.value['date-from'],
      endDate: this.form.value['date-to']
    }, 'confirm');
  }
  
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }

  onSubmit() {
    console.log('Submited!');
  }

}
