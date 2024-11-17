import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-iftalabel-demo',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel class="w-full md:w-56">
                <p-select [(ngModel)]="selectedCity" inputId="dd-city" [options]="cities" optionLabel="name" styleClass="w-full" />
                <label for="dd-city">City</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="select-iftalabel-demo"></app-code>
    `
})
export class IftaLabelDoc implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;
    code: Code = {
        basic: `<p-iftalabel class="w-full md:w-56">
    <p-select [(ngModel)]="selectedCity" inputId="dd-city" [options]="cities" optionLabel="name" styleClass="w-full" />
    <label for="dd-city">City</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel class="w-full md:w-56">
        <p-select [(ngModel)]="selectedCity" inputId="dd-city" [options]="cities" optionLabel="name" styleClass="w-full" />
        <label for="dd-city">City</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-iftalabel-demo',
    templateUrl: './select-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule, IftaLabelModule]
})
export class SelectIftaLabelDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
