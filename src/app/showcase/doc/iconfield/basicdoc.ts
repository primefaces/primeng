import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                A group is created by wrapping the input and icon with the IconField component. Each icon is defined as a child of InputIcon component. In addition, position of the icon can be changed using iconPosition property that the default
                value is right and also left option is available.
            </p>
        </app-docsectiontext>

            <p-iconField>
                <p-inputIcon>
                    <i class="pi pi-search"></i>
                </p-inputIcon>
                <input type="text" pInputText [(ngModel)]="value" />
            </p-iconField>
       
        <span class="p-input-icon-left">
    <i class="pi pi-search"></i>
    <input type="text" pInputText [(ngModel)]="value" />
</span>
        <app-code [code]="code" selector="iconfield-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inplace>
    <ng-template pTemplate="display">
        <span>View Content</span>
    </ng-template>
    <ng-template pTemplate="content">
        <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </span>
    </ng-template>
</p-inplace>`,
        html: `
<div class="card">
    <p-inplace>
        <ng-template pTemplate="display">
            <span>View Content</span>
        </ng-template>
        <ng-template pTemplate="content">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
        </ng-template>
    </p-inplace>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'iconField-basic-demo',
    templateUrl: './iconField-basic-demo.html'
})
export class IconFieldBasicDemo {}`
    };
}
