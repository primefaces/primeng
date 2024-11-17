import { Code } from '@/domain/code';
import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'ifta-label-doc',
    template: ` <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" inputId="ac" />
                <label for="ac">Identifier</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="autocomplete-ifta-label-demo"></app-code>`
})
export class IftaLabelDoc {
    items: any[] | undefined;

    value: any;
    code: Code = {
        basic: `<p-iftalabel>
    <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" inputId="ac" />
    <label for="ac">Identifier</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" inputId="ac" />
        <label for="ac">Identifier</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-ifta-label-demo',
    templateUrl: './autocomplete-ifta-label-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, IftaLabelModule]
})
export class AutocompleteIftaLabelDemo {
    items: any[] | undefined;

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}`
    };

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
