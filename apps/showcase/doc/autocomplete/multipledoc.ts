import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, AppDocSectionText, AppCode],
    template: ` <app-docsectiontext>
            <p>Enable multiple selection mode using the <i>⁠multiple</i> property to allow users to select more than one value from the autocomplete. When enabled, the value reference must be an array.</p>
        </app-docsectiontext>
        <div class="card">
            <label for="multiple-ac-1" class="font-bold mb-2 block">With Typeahead</label>
            <p-autocomplete [(ngModel)]="value1" inputId="multiple-ac-1" multiple fluid [suggestions]="items" (completeMethod)="search($event)" />

            <label for="multiple-ac-2" class="font-bold mt-8 mb-2 block">Without Typeahead</label>
            <p-autocomplete [(ngModel)]="value2" inputId="multiple-ac-2" multiple fluid (completeMethod)="search($event)" [typeahead]="false" />
        </div>
        <app-code selector="autocomplete-multiple-demo"></app-code>`
})
export class MultipleDoc {
    value1: any[] | undefined;

    value2: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
