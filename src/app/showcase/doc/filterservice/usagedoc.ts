import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'usage-doc',
    template: `
        <app-docsectiontext>
            <p><i>FilterService</i> needs to be injected into your component. Filters are accessed with <i>FilterService.filters</i>.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class UsageDoc {
    code: Code = {
        typescript: `export class FilterServiceDemo implements OnInit {

    constructor(private filterService: FilterService) {}

    ngOnInit() {
        const value = 'PrimeNG';

        this.filterService.filters.equals(value, 'NG');                            //false
        this.filterService.filters.equals(value, 8);                               //false
        this.filterService.filters.equals(value, new Date());                      //false
        this.filterService.filters.contains(value, 'NG');                          //true
        this.filterService.filters.startsWith(value, 'NG');                        //false
        this.filterService.filters.endsWith(value, 'NG');                          //true
        this.filterService.filters.lt(10, 20);                                     //true
        this.filterService.filters.gt(50, 20);                                     //true
        this.filterService.filters.in(value, ['PrimeFaces', 'PrimeNG']);           //true
    }
}`
    };
}
