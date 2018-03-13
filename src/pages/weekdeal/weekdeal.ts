import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ParseDealXML } from './../utils/parseDealXML'

@Component({
  selector: 'page-weekdeal',
  templateUrl: 'weekdeal.html'
})
export class WeekDealPage {

  constructor(public navCtrl: NavController, public http: Http, public dealParser: ParseDealXML) {}

  ionViewWillEnter() {
    this.dealParser.parse('https://www.daydeal.ch/dealoftheweek.xml')
  }
}
