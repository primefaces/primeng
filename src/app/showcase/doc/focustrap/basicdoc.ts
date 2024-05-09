import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'focus-trap-basic-demo',
    template: `
        <app-docsectiontext>
            <p>FocusTrap is applied to a container element with the <i>pFocusTrap</i> directive.</p>
        </app-docsectiontext>
        <div pFocusTrap class="card flex align-items-center justify-content-center flex-wrap gap-3">
            <div>
                <h4>Input</h4>
                <input id="input" type="text" size="30" pInputText />
            </div>
            <div>
                <h4>Float Label</h4>
                <span class="p-float-label">
                    <input id="float-input" type="text" size="30" pInputText />
                    <label for="float-input">Username</label>
                </span>
            </div>
            <div>
                <h4>Disabled Input</h4>
                <input id="disabled-input" type="text" size="30" pInputText [disabled]="true" />
            </div>
            <div>
                <h4>Input with tabindex -1</h4>
                <input type="text" size="30" pInputText tabindex="-1" />
            </div>
            <div>
                <h4>Button</h4>
                <p-button icon="pi pi-check" label="Check" />
            </div>
            <div>
                <h4>Dropdown</h4>
                <p-dropdown [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" optionLabel="name" [showClear]="true" />
            </div>
        </div>
        <app-code [code]="code" selector="focus-trap-basic-demo"></app-code>
    `
})
export class BasicDoc {
    selectedCity: string | undefined;

    cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    code: Code = {
        basic: `<div pFocusTrap class="card flex align-items-center justify-content-center flex-wrap gap-3">
    <div>
        <h4>Input</h4>
        <input id="input" type="text" size="30" pInputText>
    </div>
    <div>
        <h4>Float Label</h4>
        <span class="p-float-label">
            <input id="float-input" type="text" size="30" pInputText> 
            <label for="float-input">Username</label>
        </span>
    </div>
</div>`,
        html: `<div pFocusTrap class="card flex align-items-center justify-content-center flex-wrap gap-3">
    <div>
        <h4>Input</h4>
        <input id="input" type="text" size="30" pInputText>
    </div>
    <div>
        <h4>Float Label</h4>
        <span class="p-float-label">
            <input id="float-input" type="text" size="30" pInputText> 
            <label for="float-input">Username</label>
        </span>
    </div>
    <div>
        <h4>Disabled Input</h4>
        <input id="disabled-input" type="text" size="30" pInputText [disabled]="true" />
    </div>
    <div>
        <h4>Input with tabindex -1</h4>
        <input type="text" size="30" pInputText tabindex="-1" />
    </div>
    <div>
        <h4>Button</h4>
        <p-button icon="pi pi-check" label="Check" />
    </div>
    <div>
        <h4>Dropdown</h4>
        <p-dropdown 
            [options]="cities" 
            [(ngModel)]="selectedCity" 
            placeholder="Select a City" 
            optionLabel="name" 
            [showClear]="true" />
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
        
@Component({
    selector: 'focus-trap-basic-demo',
    templateUrl: './focus-trap-basic-demo.html',
    standalone: true,
    imports: [FocusTrapModule, ButtonModule, DropdownModule, FormsModule, InputTextModule]
})
export class FocusTrapBasicDemo {
    selectedCity: string | undefined;

    cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
}`
    };
}
