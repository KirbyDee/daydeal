import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  constructor(public http: Http) {}

  public parse(url: string) {
    this.http.get(url).map(res => res.text()).subscribe(data => {
      this.parseXML(data).then(
        deal => {
          console.log(deal);
          this.dealStart              = deal.dealStart[0];
          this.dealEnd                = deal.dealEnd[0];
          this.productName            = deal.productName[0];
          this.productSubTitle        = deal.productSubTitle[0];
          this.daydealImage           = deal.daydealImage[0];
          this.daydealImageTeaserBox  = deal.daydealImageTeaserBox[0];
          this.daydealImageThumb      = deal.daydealImageThumb[0];
          this.maxQuantity            = deal.maxQuantity[0];
          this.originalPrice          = deal.originalPrice[0];
          this.daydealPrice           = deal.daydealPrice[0];
          this.availabilityPercent    = deal.availabilityPercent[0];
          this.manufacturer           = deal.manufacturer[0];
          this.manufacturerUrl        = deal.manufacturerUrl[0];
          this.productAttributes      = deal.productAttributes[0].productAttribute;
          this.productDetails         = deal.productDetails[0];
          this.orderRemarks           = deal.orderRemarks[0];
          this.productImages          = deal.productImages[0].productImage;
        }
      );
    }, err => {
      console.log("Oops!");
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
