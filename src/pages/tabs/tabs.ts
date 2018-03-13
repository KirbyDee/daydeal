import { Component } from '@angular/core';

import { DayDealPage } from '../daydeal/daydeal';
import { WeekDealPage } from '../weekdeal/weekdeal';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  daydeal = DayDealPage;
  weekdeal = WeekDealPage;

  constructor() {}
}
