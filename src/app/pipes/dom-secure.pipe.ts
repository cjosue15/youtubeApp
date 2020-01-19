import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSecure'
})
export class DomSecurePipe implements PipeTransform {

  constructor(private dom:DomSanitizer) {}

  transform(value: any): any {

    let urlYT = 'https://www.youtube.com/embed/';

    return this.dom.bypassSecurityTrustResourceUrl(urlYT + value);

  }

}
