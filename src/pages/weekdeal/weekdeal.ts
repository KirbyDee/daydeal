import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ParseDealXML } from './../utils/parseDealXML'

@Component({
  selector: 'page-weekdeal',
  templateUrl: 'weekdeal.html'
})
export class WeekDealPage {

  constructor(public navCtrl: NavController, public http: HTTP, public dealParser: ParseDealXML) {}

  ionViewWillEnter() {
    this.dealParser.parse('https://www.daydeal.ch/dealoftheweek.xml')
  }
}
