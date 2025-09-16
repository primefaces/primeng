import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'filter-doc',
    standalone: true,
    imports: [FormsModule, ListboxModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>ListBox provides built-in filtering that is enabled by adding the <i>filter</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [filter]="true" class="w-full md:w-56" />
        </div>
        <app-code [code]="code" selector="listbox-filter-demo"></app-code>
    `
})
export class FilterDoc implements OnInit {
    cities!: City[];

    selectedCity!: City;

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
        basic: `<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [filter]="true" class="w-full md:w-56" />`,

        html: `<div class="card flex justify-center">
    <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [filter]="true" class="w-full md:w-56" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-filter-demo',
    templateUrl: './listbox-filter-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxFilterDemo implements OnInit {
    cities!: City[];

    selectedCity!: City;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}`
    };
}
