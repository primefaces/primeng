import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-basic-demo',
    standalone: true,
    imports: [AppDocSectionText, AppCode, FormsModule, SelectModule],
    template: `
        <app-docsectiontext>
            <p>
                Select is used as a controlled component with <i>ngModel</i> property along with an <i>options</i> collection. Label and value of an option are defined with the <i>optionLabel</i> and <i>optionValue</i> properties respectively. Note
                that, when options are simple primitive values such as a string array, no <i>optionLabel</i> and <i>optionValue</i> would be necessary.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
            <p-select [options]="cities" [(value2)]="selectedCity2" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
        </div>
        <app-code [code]="code" selector="select-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    cities: City[];

    selectedCity: City | undefined;

    selectedCity2: City | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        // @todo remove following lines, just for demo purpose
        this.selectedCity = this.cities[0];
        this.selectedCity2 = this.cities[1];
    }

    code: Code = {
        basic: `<p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />`,

        html: `<div class="card flex justify-center">
    <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-basic-demo',
    templateUrl: './select-basic-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectBasicDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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
