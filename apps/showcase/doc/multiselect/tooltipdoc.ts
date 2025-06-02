import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
    disabled: boolean;
    disabledTooltip?: string;
}

@Component({
    selector: 'tooltip-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Tooltips can be defined for specific options.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionDisabled="disabled" optionTooltip="disabledTooltip" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="4" styleClass="w-full md:w-80" />
        </div>
        <app-code [code]="code" selector="multi-select-tooltip-demo"></app-code>
    `
})
export class TooltipDoc implements OnInit {
    cities!: City[];

    selectedCities!: any[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY', disabled: false },
            { name: 'Rome', code: 'RM', disabled: false },
            { name: 'London', code: 'LDN', disabled: false },
            { name: 'Istanbul', code: 'IST', disabled: true, disabledTooltip: 'Currently in maintenance' },
            { name: 'Paris', code: 'PRS', disabled: false }
        ];
    }

    code: Code = {
        basic: `<p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionDisabled="disabled" optionTooltip="disabledTooltip" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="4" styleClass="w-full md:w-80" />`,

        html: `<div class="card flex justify-center">
    <p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionDisabled="disabled" optionTooltip="disabledTooltip" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="4" styleClass="w-full md:w-80" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string;
    code: string;
    disabled: boolean;
    disabledTooltip?: string;
}

@Component({
    selector: 'multi-select-tooltip-demo',
    templateUrl: './multi-select-tooltip-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectTooltipDemo implements OnInit {

    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY', disabled: false },
            { name: 'Rome', code: 'RM', disabled: false },
            { name: 'London', code: 'LDN', disabled: false },
            { name: 'Istanbul', code: 'IST', disabled: true, disabledTooltip: 'Currently in maintenance' },
            { name: 'Paris', code: 'PRS', disabled: false }
        ];
    }
}`
    };
}
