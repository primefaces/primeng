import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'check-mark-doc',
    standalone: true,
    imports: [FormsModule, ListboxModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>An alternative way to highlight the selected option is displaying a checkmark instead.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-listbox [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" [checkmark]="true" [highlightOnSelect]="false" class="w-full md:w-56" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class CheckmarkDoc implements OnInit {
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
}
