// TODO: this doc will be removed later
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
    disabled?: boolean;
}

@Component({
    selector: 'pt-playground',
    standalone: true,
    imports: [AppDocSectionText, CommonModule, FormsModule, SelectModule],
    template: `
        <app-docsectiontext>
            <p>Select component with <strong>PassThrough (PT)</strong> demonstrating <strong>context-based dynamic styling</strong>.</p>
            <p class="mt-3">
                The <i>option</i> PassThrough section receives a <i>context</i> object with properties like <i>selected</i>, <i>focused</i>, <i>disabled</i>, <i>index</i>, and <i>option</i> data, allowing for dynamic conditional styling.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" [filter]="true" [showClear]="true" [checkmark]="true" class="w-full md:w-56" [pt]="selectPT" />
        </div>
        <div class="mt-4 p-4 bg-gray-100 rounded">
            <h4 class="font-bold mb-2">Selected City:</h4>
            <p *ngIf="selectedCity">{{ selectedCity.name }} ({{ selectedCity.code }})</p>
            <p *ngIf="!selectedCity" class="text-gray-500">No city selected</p>
        </div>
    `
})
export class PTPlayground implements OnInit {
    cities: City[];
    selectedCity: City | undefined;

    // PassThrough configuration with context-based dynamic styling
    // Context provides: option, index, selected, focused, disabled
    selectPT = {
        // Root element styling
        root: {
            class: 'border-2 border-primary rounded-lg',
            style: 'background: #f8f9fa'
        },
        // Selected label styling
        label: {
            class: 'text-primary font-semibold px-3',
            style: 'color: #3b82f6'
        },
        // Dropdown button styling
        dropdown: {
            class: 'bg-primary-100 hover:bg-primary-200',
            style: 'border-left: 2px solid #3b82f6'
        },
        // Dropdown icon styling
        dropdownIcon: {
            class: 'text-primary'
        },
        // Clear icon styling
        clearIcon: {
            class: 'text-red-500 hover:text-red-700'
        },
        // Overlay panel styling
        pcOverlay: {
            root: {
                class: 'border-2 border-primary shadow-2xl',
                style: 'margin-top: 8px'
            }
        },
        // Filter container styling
        pcFilterContainer: {
            class: 'p-3'
        },
        // Filter input styling
        pcFilter: {
            class: 'border-2 border-primary-300 focus:border-primary-500',
            style: 'border-radius: 8px'
        },
        // List container styling
        listContainer: {
            class: 'bg-white'
        },
        // List (ul) styling
        list: {
            class: 'p-2',
            style: 'max-height: 300px'
        },
        // 🌟 CONTEXT-BASED DYNAMIC STYLING 🌟
        // Individual option styling with context
        option: ({ context }: any) => {
            console.log('Option PT Context:', {
                option: context?.option,
                index: context?.index,
                selected: context?.selected,
                focused: context?.focused,
                disabled: context?.disabled
            });

            return {
                class: [
                    'rounded-md transition-all duration-200',
                    {
                        // Style for selected option
                        'bg-primary-100 font-semibold text-primary-800': context?.selected,
                        // Style for focused option (not selected)
                        'bg-blue-50 border-l-4 border-blue-500': context?.focused && !context?.selected,
                        // Hover effect for non-disabled options
                        'hover:bg-primary-50 cursor-pointer': !context?.disabled,
                        // Style for disabled options
                        'opacity-50 cursor-not-allowed': context?.disabled,
                        // Default style
                        'bg-white': !context?.selected && !context?.focused
                    }
                ],
                style: {
                    padding: '10px',
                    margin: '2px 0',
                    // Zebra striping based on index
                    backgroundColor: context?.index % 2 === 0 ? '#f9fafb' : '#ffffff'
                },
                // Custom data attributes for testing/debugging
                'data-option-index': context?.index,
                'data-selected': context?.selected,
                'data-city-code': context?.option?.code
            };
        },
        // Check icon for selected options - using context
        optionCheckIcon: ({ context }: any) => ({
            class: context?.selected ? 'text-green-600 font-bold' : 'text-gray-300'
        }),
        // Blank icon for unselected options
        optionBlankIcon: {
            class: 'text-gray-300'
        },
        // Option label text styling - using context for dynamic styling
        optionLabel: ({ context }: any) => ({
            class: [
                'font-medium',
                {
                    'text-primary-800 font-bold': context?.selected,
                    'text-blue-700': context?.focused && !context?.selected,
                    'text-gray-800': !context?.selected && !context?.focused,
                    'text-gray-400': context?.disabled
                }
            ]
        }),
        // Empty message styling
        emptyMessage: {
            class: 'text-gray-500 italic text-center',
            style: 'padding: 20px'
        }
    };

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN', disabled: true }, // Disabled option to showcase context.disabled
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Tokyo', code: 'TYO' },
            { name: 'Berlin', code: 'BER' }
        ];
    }
}
