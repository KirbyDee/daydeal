import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';
import { ParseDealXML } from './parseDealXML';
import { BackgroundMode } from '@ionic-native/background-mode';

@Injectable()
export class DealPoller {

  public dealStart: string;
  public dealEnd: string;
  public productName: string;
  public productSubTitle: string;
  public daydealImage: string;
  public daydealImageTeaserBox: string;
  public daydealImageThumb: string;
  public maxQuantity: string;
  public originalPrice: string;
  public daydealPrice: string;
  public availabilityPercent: string;
  public manufacturer: string;
  public manufacturerUrl: string;
  public productAttributes: string[];
  public productDetails: string;
  public orderRemarks: string;
  public productImages: string[];

  constructor(public dealParser: ParseDealXML,
              private http: HTTP,
              private plt: Platform,
              private localNotifications: LocalNotifications,
              private backgroundMode: BackgroundMode) {}

  public start(url: string) {
    this.backgroundMode.enable();
    var dealData: any = {};
    this.http.get(url, {}, {}).then(response => {
      console.log("response: " + response.data)
      this.dealParser.parse(response.data).then(deal => {
      console.log("deal: " + deal)
        dealData = deal;
        this.dealStart              = dealData.dealStart[0];
        this.dealEnd                = dealData.dealEnd[0];
        this.productName            = dealData.productName[0];
        this.productSubTitle        = dealData.productSubTitle[0];
        this.daydealImage           = dealData.daydealImage[0];
        this.daydealImageTeaserBox  = dealData.daydealImageTeaserBox[0];
        this.daydealImageThumb      = dealData.daydealImageThumb[0];
        this.maxQuantity            = dealData.maxQuantity[0];
        this.originalPrice          = dealData.originalPrice[0];
        this.daydealPrice           = dealData.daydealPrice[0];
        this.availabilityPercent    = dealData.availabilityPercent[0];
        this.manufacturer           = dealData.manufacturer[0];
        this.manufacturerUrl        = dealData.manufacturerUrl[0];
        this.productAttributes      = dealData.productAttributes[0].productAttribute;
        this.productDetails         = dealData.productDetails[0];
        this.orderRemarks           = dealData.orderRemarks[0];
        this.productImages          = dealData.productImages[0].productImage;
        }
      );
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });

    var isAndroid = this.plt.is('android')
    this.localNotifications.schedule({
        id: 1,
        title: 'New Deal!',
        text: 'Name of the Deal',
        sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
        data: { secret: "key" }
    });
    this.localNotifications.schedule({
       text: 'Delayed ILocalNotification',
       trigger: {at: new Date(new Date().getTime() + 3600)},
       led: 'FF0000',
       sound: isAndroid? 'file://beep.caf': 'file://sound.mp3',
    });
  }
}
