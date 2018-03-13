import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';

@Injectable()
export class ParseDealXML {

  public data: any;

  constructor(public http: Http) {}

  public parse(url: string) {
    this.http.get(url).map(res => res.text()).subscribe(data => {
      this.parseXML(data).then(
        data => {
          this.data = data;
        }
      );
    }, err => {
      console.log("Oops!");
    });
  }

  private parseXML(data) {
    return new Promise(resolve => {
      var k,
          arr    = [],
          parser = new xml2js.Parser({
            trim: true,
            explicitArray: true
          });

      parser.parseString(data, function (err, result) {
        var deal = result.daydeal.deal[0];
        var productImages = deal.productImages[0].productImage;
        for(k in productImages) {
          var item = productImages[k];
          arr.push({
            productImage : item
          });
        }
        resolve(arr);
      });
    });
  }
}
