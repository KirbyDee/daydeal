import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';

@Injectable()
export class ParseDealXML {

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

  constructor(public http: HTTP) {}

   public parse(url: string) {
      var dealData: any = {};
      this.http.get(url, {}, {}).then(response => {
        this.parseXML(response.data).then(deal => {
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
  }

  private parseXML(data) {
    return new Promise(resolve => {
      let parser = new xml2js.Parser({
        trim: true,
        explicitArray: true
      });

      parser.parseString(data, function (err, result) {
        resolve(result.daydeal.deal[0]);
      });
    });
  }
}
