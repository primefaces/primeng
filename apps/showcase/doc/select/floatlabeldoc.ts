import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-floatlabel-demo',
    template: `
        <app-docsectiontext>
            <p>
                A floating label appears on top of the input field when focused. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel class="w-full md:w-56">
                <p-select [(ngModel)]="value1" inputId="over_label" [options]="cities" optionLabel="name" styleClass="w-full" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel class="w-full md:w-56" variant="in">
                <p-select [(ngModel)]="value2" inputId="in_label" [options]="cities" optionLabel="name" styleClass="w-full" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel class="w-full md:w-56" variant="on">
                <p-select [(ngModel)]="value3" inputId="on_label" [options]="cities" optionLabel="name" styleClass="w-full" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="select-floatlabel-demo"></app-code>
    `
})
export class FloatLabelDoc implements OnInit {
    cities: City[] | undefined;

    value1: City | undefined;

    value2: City | undefined;

    value3: City | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

    code: Code = {
        basic: `<p-floatlabel class="w-full md:w-56">
    <p-select [(ngModel)]="value1" inputId="over_label" [options]="cities" optionLabel="name" styleClass="w-full" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-56" variant="in">
    <p-select [(ngModel)]="value2" inputId="in_label" [options]="cities" optionLabel="name" styleClass="w-full" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-56" variant="on">
    <p-select [(ngModel)]="value3" inputId="on_label" [options]="cities" optionLabel="name" styleClass="w-full" />
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel class="w-full md:w-56">
        <p-select [(ngModel)]="value1" inputId="over_label" [options]="cities" optionLabel="name" styleClass="w-full" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel class="w-full md:w-56" variant="in">
        <p-select [(ngModel)]="value2" inputId="in_label" [options]="cities" optionLabel="name" styleClass="w-full" />
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel class="w-full md:w-56" variant="on">
        <p-select [(ngModel)]="value3" inputId="on_label" [options]="cities" optionLabel="name" styleClass="w-full" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel"

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-floatlabel-demo',
    templateUrl: './select-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, Select, FloatLabel]
})
export class SelectFloatlabelDemo implements OnInit {
    cities: City[] | undefined;

    value1: City | undefined;

    value2: City | undefined;

    value3: City | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ];
    }
}`
    };
}
