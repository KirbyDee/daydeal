import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';

@Injectable()
export class ParseDealXML {

  public dealStart: string;
  public dealEnd: string;
  public productName: string;
  public productSubTitle: any;
  public daydealImage: any;
  public daydealImageTeaserBox: any;
  public daydealImageThumb: any;
  public maxQuantity: any;
  public originalPrice: any;
  public daydealPrice: any;
  public availabilityPercent: any;
  public manufacturer: any;
  public manufacturerUrl: any;
  public productAttributes: any;
  public productDetails: any;
  public orderRemarks: any;
  public productImages: string[];

  constructor(public http: Http) {}

  public parse(url: string) {
    this.http.get(url).map(res => res.text()).subscribe(data => {
      this.parseXML(data).then(
        deal => {
          console.log(deal);
          this.dealStart     = deal.dealStart[0];
          this.dealEnd       = deal.dealEnd[0];
          this.productName   = deal.productName[0];
          this.productImages = deal.productImages[0].productImage;
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
