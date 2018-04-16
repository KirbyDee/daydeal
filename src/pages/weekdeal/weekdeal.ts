import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DealPoller } from './../../app/dealPoller'

@Component({
  selector: 'page-weekdeal',
  templateUrl: 'weekdeal.html'
})
export class WeekDealPage {

  constructor(public navCtrl: NavController, public dealPoller: DealPoller) {}

  ionViewWillEnter() {
    this.dealPoller.start('https://www.daydeal.ch/dealoftheweek.xml')
  }
}
