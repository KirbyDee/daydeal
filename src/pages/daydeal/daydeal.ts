import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DealPoller } from './../../app/dealPoller'

@Component({
  selector: 'page-daydeal',
  templateUrl: 'daydeal.html'
})
export class DayDealPage {

  constructor(public navCtrl: NavController, public dealPoller: DealPoller) {}

  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    this.dealPoller.start('https://www.daydeal.ch/daydeal.xml')
  }
}
