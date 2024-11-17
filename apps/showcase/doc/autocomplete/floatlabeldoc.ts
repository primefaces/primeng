import { Code } from '@/domain/code';
import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'float-label-doc',
    template: ` <app-docsectiontext>
            <p>
                A floating label appears on top of the input field when focused. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search($event)" inputId="over_label" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search($event)" inputId="in_label" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search($event)" inputId="on_label" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="autocomplete-float-label-demo"></app-code>`
})
export class FloatLabelDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    items: any[] | undefined;
    code: Code = {
        basic: `<p-floatlabel>
    <p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search($event)" inputId="over_label" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search($event)" inputId="in_label" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search($event)" inputId="on_label" />
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel>
        <p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search($event)" inputId="over_label" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
        <p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search($event)" inputId="in_label" />
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel variant="on">
        <p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search($event)" inputId="on_label" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { FloatLabel } from 'primeng/floatlabel';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-float-label-demo',
    templateUrl: './autocomplete-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete, FloatLabel]
})
export class AutocompleteFloatLabelDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}`
    };

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
