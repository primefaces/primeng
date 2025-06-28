import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
    disabled: boolean;
    disabledTooltip?: string;
}

@Component({
    selector: 'select-tooltip-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Tooltips can be defined for specific options.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-select [options]="cities" [(ngModel)]="selectedCity" optionDisabled="disabled" optionTooltip="disabledTooltip" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
        </div>
        <app-code [code]="code" selector="select-tooltip-demo"></app-code>
    `
})
export class TooltipDoc implements OnInit {
    cities: City[];

    selectedCity: City | undefined;

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
        basic: `<p-select [options]="cities" [(ngModel)]="selectedCity" optionDisabled="disabled" optionTooltip="disabledTooltip" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />`,

        html: `<div class="card flex justify-center">
    <p-select [options]="cities" [(ngModel)]="selectedCity" optionDisabled="disabled" optionTooltip="disabledTooltip" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
    disabled: boolean;
    disabledTooltip?: string
}

@Component({
    selector: 'select-tooltip-demo',
    templateUrl: './select-tooltip-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectTooltipDemo implements OnInit {
    cities: City[];

    selectedCity: City | undefined;

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
