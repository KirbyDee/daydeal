import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DealPoller } from './dealPoller';
import { ParseDealXML } from './parseDealXML';

import { DayDealPage } from '../pages/daydeal/daydeal';
import { WeekDealPage } from '../pages/weekdeal/weekdeal';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

@NgModule({
  declarations: [
    MyApp,
    DayDealPage,
    WeekDealPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    BackgroundMode,
    StatusBar,
    SplashScreen,
    ParseDealXML,
    DealPoller,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
