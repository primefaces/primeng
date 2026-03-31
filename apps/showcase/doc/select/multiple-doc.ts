import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

interface Topping {
    label: string;
    value: string;
}

@Component({
    selector: 'multiple-doc',
    standalone: true,
    imports: [FormsModule, SelectModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>multiple</i> is enabled, multiple items can be selected. Use <i>checkmark</i> to display a check indicator and a custom <i>#selectedItem</i> template for the label.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-select [options]="toppings" [(ngModel)]="selected" [multiple]="true" [checkmark]="true" optionLabel="label" optionValue="value" [showClear]="true" placeholder="Select Toppings" class="w-full md:w-56">
                    <ng-template #selectedItem>
                        <span>{{ getLabel() }}</span>
                    </ng-template>
                </p-select>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class MultipleDoc {
    toppings: Topping[] = [
        { label: 'Pepperoni', value: 'pepperoni' },
        { label: 'Mushrooms', value: 'mushrooms' },
        { label: 'Onions', value: 'onions' },
        { label: 'Black Olives', value: 'olives' },
        { label: 'Green Peppers', value: 'peppers' },
        { label: 'Mozzarella', value: 'mozzarella' },
        { label: 'Basil', value: 'basil' },
        { label: 'Tomatoes', value: 'tomatoes' }
    ];

    selected: string[] = [];

    getLabel(): string {
        if (this.selected.length === 0) return '';
        const first = this.toppings.find((t) => t.value === this.selected[0])?.label ?? this.selected[0];
        return this.selected.length > 1 ? `${first} (+${this.selected.length - 1} more)` : first;
    }
}
