import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';
import { ParseDealXML } from './parseDealXML';
import { Storage } from '@ionic/storage';

@Injectable()
export class DealGET {

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

  private url: string;
  private deal: number;
  private isAndroid: boolean;
  private titlePostFix: string;

  constructor(public dealParser: ParseDealXML,
              private http: HTTP,
              private plt: Platform,
              private localNotifications: LocalNotifications,
              private storage: Storage) {}

  public get(url: string, deal: number) {
    this.url = url;
    this.deal = deal;
    this.isAndroid = this.plt.is('android');
    if (this.deal == 0) {
      this.titlePostFix = 'Day';
    } else {
      this.titlePostFix = 'Week';
    }

    // get new data first
    this.restoreFromDB();
    this.getData();
  }

  private getData() {
    console.log('GET data from: ' + this.url);
    var dealData: any = {};
    this.http.get(this.url, {}, {}).then(response => {
      this.dealParser.parse(response.data).then(deal => {
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

        // Check if we have a new deal
        this.storage.get("productName" + this.deal.toString()).then((currentDealProductName) => {
          console.log('Current ProductName: ', currentDealProductName);
          if (currentDealProductName != this.productName) {
            this.newDeal();
          }
        });
      });
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    });
  }

  private newDeal() {
    console.log('New Deal');

    // set new deal
    this.storeInDB();

    // push notification
    this.localNotifications.schedule({
        id: this.deal,
        title: 'New Deal of the ' + this.titlePostFix,
        text: this.productName,
        sound: this.isAndroid? 'file://sound.mp3': 'file://beep.caf',
        launch: true,
        led: '23B40C'
    });
  }

  private storeInDB() {
    this.storeInDBWith("dealStart", this.dealStart);
    this.storeInDBWith("dealEnd", this.dealEnd);
    this.storeInDBWith("productName", this.productName);
    this.storeInDBWith("productSubTitle", this.productSubTitle);
    this.storeInDBWith("daydealImage", this.daydealImage);
    this.storeInDBWith("daydealImageTeaserBox", this.daydealImageTeaserBox);
    this.storeInDBWith("daydealImageThumb", this.daydealImageThumb);
    this.storeInDBWith("maxQuantity", this.maxQuantity);
    this.storeInDBWith("originalPrice", this.originalPrice);
    this.storeInDBWith("daydealPrice", this.daydealPrice);
    this.storeInDBWith("availabilityPercent", this.availabilityPercent);
    this.storeInDBWith("manufacturer", this.manufacturer);
    this.storeInDBWith("manufacturerUrl", this.manufacturerUrl);
    this.storeInDBWith("productAttributes", this.productAttributes);
    this.storeInDBWith("productDetails", this.productDetails);
    this.storeInDBWith("orderRemarks", this.orderRemarks);
    this.storeInDBWith("productImages", this.productImages);
  }

  private storeInDBWith(paramName: string, param: any) {
    this.storage.set(paramName + this.deal.toString(), param);
  }

  private restoreFromDB() {
    this.restoreFromDBWith("dealStart", this.dealStart);
    this.restoreFromDBWith("dealEnd", this.dealEnd);
    this.restoreFromDBWith("productName", this.productName);
    this.restoreFromDBWith("productSubTitle", this.productSubTitle);
    this.restoreFromDBWith("daydealImage", this.daydealImage);
    this.restoreFromDBWith("daydealImageTeaserBox", this.daydealImageTeaserBox);
    this.restoreFromDBWith("daydealImageThumb", this.daydealImageThumb);
    this.restoreFromDBWith("maxQuantity", this.maxQuantity);
    this.restoreFromDBWith("originalPrice", this.originalPrice);
    this.restoreFromDBWith("daydealPrice", this.daydealPrice);
    this.restoreFromDBWith("availabilityPercent", this.availabilityPercent);
    this.restoreFromDBWith("manufacturer", this.manufacturer);
    this.restoreFromDBWith("manufacturerUrl", this.manufacturerUrl);
    this.restoreFromDBWith("productAttributes", this.productAttributes);
    this.restoreFromDBWith("productDetails", this.productDetails);
    this.restoreFromDBWith("orderRemarks", this.orderRemarks);
    this.restoreFromDBWith("productImages", this.productImages);
  }

  private restoreFromDBWith(paramName: string, param: any) {
     this.storage.get(paramName + this.deal.toString()).then((value) => {
       paramName = value;
     });
  }
}
