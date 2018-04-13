import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ParseDealXML } from '../pages/utils/parseDealXML';

import { DayDealPage } from '../pages/daydeal/daydeal';
import { WeekDealPage } from '../pages/weekdeal/weekdeal';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    StatusBar,
    SplashScreen,
    ParseDealXML,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
