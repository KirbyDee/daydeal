import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DealGET } from './../../app/dealGET'

@Component({
  selector: 'page-daydeal',
  templateUrl: 'daydeal.html'
})
export class DayDealPage {

  constructor(public navCtrl: NavController, public dealGET: DealGET) {}

  ionViewWillEnter() {
    this.dealGET.get('https://www.daydeal.ch/daydeal.xml', 0);
  }
}
