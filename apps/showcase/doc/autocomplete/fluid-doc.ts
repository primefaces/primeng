import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppCode } from '@/components/doc/app.code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, AppDocSectionText, AppCode, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <app-demo-wrapper name="fluid-demo">
            <div>
                <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" fluid />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>`
})
export class FluidDoc {
    items: any[] = [];

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
