import { Component, OnInit } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'checkmark-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, FormsModule, SelectModule],
    template: `
        <app-docsectiontext>
            <p>An alternative way to highlight the selected option is displaying a checkmark instead.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-select [options]="cities" [(ngModel)]="selectedCity" [checkmark]="true" optionLabel="name" [showClear]="true" placeholder="Select a City" class="w-full md:w-56" />
        </div>
        <app-code></app-code>
    `
})
export class CheckmarkDoc implements OnInit {
    cities: City[];

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
}
