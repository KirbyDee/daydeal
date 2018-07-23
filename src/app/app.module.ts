import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DealGET } from './dealGET';
import { ParseDealXML } from './parseDealXML';

import { DayDealPage } from '../pages/daydeal/daydeal';
import { WeekDealPage } from '../pages/weekdeal/weekdeal';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    DayDealPage,
    WeekDealPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DayDealPage,
    WeekDealPage,
    TabsPage
  ],
  providers: [
    HTTP,
    LocalNotifications,
    StatusBar,
    SplashScreen,
    ParseDealXML,
    DealGET,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
