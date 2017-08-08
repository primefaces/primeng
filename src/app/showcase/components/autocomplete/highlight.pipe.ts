import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, query: string): any {
    if (typeof query !== 'string') {
      return value;
    }
    return value.replace(new RegExp('(\\s+)?(' + pregQuote(query) + ')', 'gi'), '$1<b>$2</b>');
  }

}

export function pregQuote(str: string) {
  return (str + '')
  .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '-]', 'g'), '\\$&');
}
