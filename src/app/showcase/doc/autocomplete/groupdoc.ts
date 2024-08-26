import { Component, OnInit } from '@angular/core';
import { FilterService, SelectItemGroup } from 'primeng/api';
import { Code } from '@domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'grouped-doc',
    template: ` <app-docsectiontext>
            <p>Option grouping is enabled when <i>group</i> property is set to <i>true</i>. <i>group</i> template is available to customize the option groups. All templates get the option instance as the default local template variable.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-autoComplete [(ngModel)]="selectedCity" [group]="true" [suggestions]="filteredGroups" (completeMethod)="filterGroupedCity($event)" placeholder="Hint: type 'a'">
                <ng-template let-group pTemplate="group">
                    <div class="flex items-center">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
                        <span>{{ group.label }}</span>
                    </div>
                </ng-template>
            </p-autoComplete>
        </div>
        <app-code [code]="code" selector="autocomplete-grouped-demo"></app-code>`
})
export class GroupDoc implements OnInit {
    selectedCity: any;

    filteredGroups: any[] | undefined;

    groupedCities: SelectItemGroup[] | undefined;

    constructor(private filterService: FilterService) {}

    ngOnInit() {
        this.groupedCities = [
            {
                label: 'Germany',
                value: 'de',
                items: [
                    { label: 'Berlin', value: 'Berlin' },
                    { label: 'Frankfurt', value: 'Frankfurt' },
                    { label: 'Hamburg', value: 'Hamburg' },
                    { label: 'Munich', value: 'Munich' }
                ]
            },
            {
                label: 'USA',
                value: 'us',
                items: [
                    { label: 'Chicago', value: 'Chicago' },
                    { label: 'Los Angeles', value: 'Los Angeles' },
                    { label: 'New York', value: 'New York' },
                    { label: 'San Francisco', value: 'San Francisco' }
                ]
            },
            {
                label: 'Japan',
                value: 'jp',
                items: [
                    { label: 'Kyoto', value: 'Kyoto' },
                    { label: 'Osaka', value: 'Osaka' },
                    { label: 'Tokyo', value: 'Tokyo' },
                    { label: 'Yokohama', value: 'Yokohama' }
                ]
            }
        ];
    }

    filterGroupedCity(event: AutoCompleteCompleteEvent) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.groupedCities as SelectItemGroup[]) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, 'contains');
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    value: optgroup.value,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredGroups = filteredGroups;
    }

    code: Code = {
        basic: `<p-autoComplete 
    [(ngModel)]="selectedCity" 
    [group]="true" 
    [suggestions]="filteredGroups" 
    (completeMethod)="filterGroupedCity($event)" 
    placeholder="Hint: type 'a'">
        <ng-template let-group pTemplate="group">
            <div class="flex items-center">
                <img 
                    src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" 
                    [class]="'mr-2 flag flag-' + group.value" 
                    style="width: 20px" />
                <span>{{ group.label }}</span>
            </div>
        </ng-template>
</p-autoComplete>`,

        html: `<div class="card flex justify-center">
    <p-autoComplete 
        [(ngModel)]="selectedCity" 
        [group]="true" 
        [suggestions]="filteredGroups" 
        (completeMethod)="filterGroupedCity($event)" 
        placeholder="Hint: type 'a'">
            <ng-template let-group pTemplate="group">
                <div class="flex items-center">
                    <img 
                        src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                        [class]="'mr-2 flag flag-' + group.value" 
                        style="width: 20px" />
                    <span>{{ group.label }}</span>
                </div>
            </ng-template>
    </p-autoComplete>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FilterService, SelectItemGroup } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-grouped-demo',
    templateUrl: './autocomplete-grouped-demo.html',
    standalone: true,
    imports: [AutoCompleteModule, FormsModule],
  })
export class AutocompleteGroupedDemo implements OnInit {
    selectedCity: any;

    filteredGroups: any[] | undefined;

    groupedCities: SelectItemGroup[] | undefined;

    constructor(private filterService: FilterService) { }

    ngOnInit() {
        this.groupedCities = [
            {
                label: 'Germany', value: 'de',
                items: [
                    { label: 'Berlin', value: 'Berlin' },
                    { label: 'Frankfurt', value: 'Frankfurt' },
                    { label: 'Hamburg', value: 'Hamburg' },
                    { label: 'Munich', value: 'Munich' }
                ]
            },
            {
                label: 'USA', value: 'us',
                items: [
                    { label: 'Chicago', value: 'Chicago' },
                    { label: 'Los Angeles', value: 'Los Angeles' },
                    { label: 'New York', value: 'New York' },
                    { label: 'San Francisco', value: 'San Francisco' }
                ]
            },
            {
                label: 'Japan', value: 'jp',
                items: [
                    { label: 'Kyoto', value: 'Kyoto' },
                    { label: 'Osaka', value: 'Osaka' },
                    { label: 'Tokyo', value: 'Tokyo' },
                    { label: 'Yokohama', value: 'Yokohama' }
                ]
            }
        ];
    }

    filterGroupedCity(event: AutoCompleteCompleteEvent) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.groupedCities) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    value: optgroup.value,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredGroups = filteredGroups;
    }
}`
    };
}
