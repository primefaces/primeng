import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Custom content for an option is displayed with the <i>pTemplate</i> property that takes an option as a parameter.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-listbox [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [listStyle]="{ 'max-height': '250px' }" [style]="{ width: '15rem' }" [listStyle]="{ 'max-height': '220px' }">
                <ng-template let-country pTemplate="item">
                    <div class="flex items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
            </p-listbox>
        </div>
        <app-code [code]="code" selector="listbox-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    countries!: Country[];

    selectedCountry!: Country;

    ngOnInit() {
        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }

    code: Code = {
        basic: `<p-listbox 
    [options]="countries" 
    [(ngModel)]="selectedCountry" 
    optionLabel="name" 
    [listStyle]="{ 'max-height': '250px' }" 
    [style]="{ width: '15rem' }" 
    [listStyle]="{'max-height': '220px'}">
        <ng-template let-country pTemplate="item">
            <div class="flex items-center gap-2">
                <img 
                    src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" 
                    [class]="'flag flag-' + country.code.toLowerCase()" 
                    style="width: 18px" />
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
</p-listbox>`,

        html: `<div class="card flex justify-center">
    <p-listbox 
        [options]="countries" 
        [(ngModel)]="selectedCountry" 
        optionLabel="name" 
        [listStyle]="{ 'max-height': '250px' }"
        [style]="{ width: '15rem' }" 
        [listStyle]="{'max-height': '220px'}">
            <ng-template let-country pTemplate="item">
                <div class="flex items-center gap-2">
                    <img 
                        src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                        [class]="'flag flag-' + country.code.toLowerCase()" 
                        style="width: 18px" />
                    <div>{{ country.name }}</div>
                </div>
            </ng-template>
    </p-listbox>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

interface Country {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-template-demo',
    templateUrl: './listbox-template-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxTemplateDemo implements OnInit {
    countries!: Country[];

    selectedCountry!: Country;

    ngOnInit() {
        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }
}`
    };
}
