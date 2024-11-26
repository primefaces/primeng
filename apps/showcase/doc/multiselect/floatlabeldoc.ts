import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>
                A floating label appears on top of the input field when focused. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel class="w-full md:w-80">
                <p-multiselect id="over_label" [(ngModel)]="value1" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel class="w-full md:w-80" variant="in">
                <p-multiselect id="in_label" [(ngModel)]="value2" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel class="w-full md:w-80" variant="on">
                <p-multiselect id="on_label" [(ngModel)]="value3" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="multi-select-floatlabel-demo"></app-code>
    `
})
export class FloatLabelDoc implements OnInit {
    cities!: City[];

    value1!: City[];

    value2!: City[];

    value3!: City[];

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
        basic: `<p-floatlabel class="w-full md:w-80">
    <p-multiselect id="over_label" [(ngModel)]="value1" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-80" variant="in">
    <p-multiselect id="in_label" [(ngModel)]="value2" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-80" variant="on">
    <p-multiselect id="on_label" [(ngModel)]="value3" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel class="w-full md:w-80">
        <p-multiselect id="over_label" [(ngModel)]="value1" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel class="w-full md:w-80" variant="in">
        <p-multiselect id="in_label" [(ngModel)]="value2" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel class="w-full md:w-80" variant="on">
        <p-multiselect id="on_label" [(ngModel)]="value3" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" styleClass="w-full" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabel } from 'primeng/floatlabel';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-floatlabel-demo',
    templateUrl: './multi-select-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, FloatLabel]
})
export class MultiSelectFloatlabelDemo implements OnInit {
    cities!: City[];

    value1!: City[];

    value2!: City[];

    value3!: City[];

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
