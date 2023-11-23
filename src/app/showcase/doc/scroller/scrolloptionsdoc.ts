import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'options-doc',
    template: `
        <app-docsectiontext>
            <p>The properties of scroller component can be used like an object in it.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ScrollOptionsDoc {

    code: Code = {
        html: `
<ng-template pTemplate="item" let-item let-scrollOptions="options">
    // item: Current item.
    // scrollOptions.index: Index of the item.
    // scrollOptions.count: Total numbers of items.
    // scrollOptions.first: Whether this is the first item.
    // scrollOptions.last: Whether this is the last item.
    // scrollOptions.even: Whether the index is even.
    // scrollOptions.odd: Whether the index is odd.
</ng-template>
<ng-template pTemplate="loader" let-scrollOptions="options">
    // scrollOptions.index: Index of the item.
    // scrollOptions.count: Total numbers of items.
    // scrollOptions.first: Whether this is the first item.
    // scrollOptions.last: Whether this is the last item.
    // scrollOptions.even: Whether the index is even.
    // scrollOptions.odd: Whether the index is odd.
    // scrollOptions.numCols: Total number of columns in a row in 'both' orientation mode in view.
</ng-template>
<ng-template pTemplate="loadericon" let-scrollOptions="options">
    // scrollOptions.styleClass: Style class of the default icon.
</ng-template>`
    };
}
