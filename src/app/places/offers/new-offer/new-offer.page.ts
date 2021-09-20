import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(180)]],
      price: ['', [Validators.required, Validators.min(1)]],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });
  }

  onCreateOffer() {
    console.log(this.form);
  }

}
