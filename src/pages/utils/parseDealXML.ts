import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';

@Injectable()
export class ParseDealXML {

  public deal: any;

  constructor(public http: Http) {}

  public parse(url: string) {
    this.http.get(url).map(res => res.text()).subscribe(data => {
      this.parseXML(data).then(
        deal => {
          this.deal = deal;
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
