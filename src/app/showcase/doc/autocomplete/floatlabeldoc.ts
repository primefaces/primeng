import { Component } from '@angular/core';
import { Code } from '@domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'float-label-doc',
    template: ` <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-floatLabel>
                <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" inputId="float-label" />
                <label for="float-label">Float Label</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="autocomplete-float-label-demo"></app-code>`
})
export class FloatLabelDoc {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    code: Code = {
        basic: `<p-floatLabel>
    <p-autoComplete 
        [(ngModel)]="selectedItem" 
        [suggestions]="suggestions" 
        (completeMethod)="search($event)" 
        inputId="float-label"/>
    <label for="float-label">Float Label</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-content-center">
    <p-floatLabel>
        <p-autoComplete 
            [(ngModel)]="selectedItem" 
            [suggestions]="suggestions" 
            (completeMethod)="search($event)" 
            inputId="float-label"/>
        <label for="float-label">Float Label</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-float-label-demo',
    templateUrl: './autocomplete-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, FloatLabelModule]
})
export class AutocompleteFloatLabelDemo {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}`
    };
}
