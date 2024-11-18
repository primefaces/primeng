import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: ` <app-docsectiontext>
            <p>AutoComplete provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search()" size="small" placeholder="Small" dropdown />
            <p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search()" placeholder="Normal" dropdown />
            <p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search()" size="large" placeholder="Large" dropdown />
        </div>
        <app-code [code]="code" selector="autocomplete-sizes-demo"></app-code>`
})
export class SizesDoc {
    items: any[] | undefined;

    value1: any;

    value2: any;

    value3: any;

    code: Code = {
        basic: `<p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search()" size="small" placeholder="Small" dropdown />
<p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search()" placeholder="Normal" dropdown />
<p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search()" size="large" placeholder="Large" dropdown />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search()" size="small" placeholder="Small" dropdown />
    <p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search()" placeholder="Normal" dropdown />
    <p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search()" size="large" placeholder="Large" dropdown />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'autocomplete-size-demo',
    templateUrl: './autocomplete-size-demo.html',
    imports: [AutoComplete, FormsModule],
    standalone: true,
})
export class AutocompleteSizesDemo {
    items: any[] | undefined;

    value1: any;

    value2: any;

    value3: any;

    search() {
        this.items = [];
    }

}`
    };

    search() {
        this.items = [];
    }
}
