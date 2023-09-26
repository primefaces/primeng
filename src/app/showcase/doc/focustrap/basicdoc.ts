import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'focus-trap-basic-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
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
                <button pButton type="button" icon="pi pi-check" label="Check"></button>
            </div>
            <div>
                <h4>Dropdown</h4>
                <p-dropdown [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" optionLabel="name" [showClear]="true"></p-dropdown>
            </div>
        </div>
        <app-code [code]="code" selector="focus-trap-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    selectedCity: string | undefined;

    cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    code: Code = {
        basic: `
<div pFocusTrap class="card flex align-items-center justify-content-center flex-wrap gap-3">
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
        html: `
<div pFocusTrap class="card flex align-items-center justify-content-center flex-wrap gap-3">
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
        <button pButton type="button" icon="pi pi-check" label="Check"></button>
    </div>
    <div>
        <h4>Dropdown</h4>
        <p-dropdown [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" optionLabel="name" [showClear]="true"></p-dropdown>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'focus-trap-basic-demo',
    templateUrl: './focus-trap-basic-demo.html'
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
