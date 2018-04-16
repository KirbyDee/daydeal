import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';

@Injectable()
export class ParseDealXML {

  constructor() {}

  public parse(data) {
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
