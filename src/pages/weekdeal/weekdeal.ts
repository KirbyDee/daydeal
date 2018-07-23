import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DealGET } from './../../app/dealGET'

@Component({
  selector: 'page-weekdeal',
  templateUrl: 'weekdeal.html'
})
export class WeekDealPage {

  constructor(public navCtrl: NavController, public dealGET: DealGET) {}

  ionViewWillEnter() {
    this.dealGET.get('https://www.daydeal.ch/dealoftheweek.xml', 1);
  }
}
