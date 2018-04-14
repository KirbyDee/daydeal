import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ParseDealXML } from './../utils/parseDealXML'
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-daydeal',
  templateUrl: 'daydeal.html'
})
export class DayDealPage {

  constructor(public navCtrl: NavController, public http: HTTP, public dealParser: ParseDealXML, private localNotifications: LocalNotifications) {}

  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    this.dealParser.parse('https://www.daydeal.ch/daydeal.xml')

    this.localNotifications.schedule({
        id: 1,
        title: 'Title',
        text: 'Text',
        sound: 'file://beep.caf',
        data: { secret: "key" }
      });
  }
}
