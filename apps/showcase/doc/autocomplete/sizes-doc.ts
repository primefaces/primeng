import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, AppDocSectionText, AppCode, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>AutoComplete provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center gap-4">
                <p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search()" size="small" placeholder="Small" dropdown />
                <p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search()" placeholder="Normal" dropdown />
                <p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search()" size="large" placeholder="Large" dropdown />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>`
})
export class SizesDoc {
    items: any[] | undefined;

    value1: any;

    value2: any;

    value3: any;

    search() {
        this.items = [];
    }
}
