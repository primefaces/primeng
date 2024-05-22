import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p><i>Inplace</i> component requires <i>display</i> and <i>content</i> templates to define the content of each state.</p>
        </app-docsectiontext>
        <div class="card">
            <p-inplace>
                <ng-template pTemplate="display">
                    <span>View Content</span>
                </ng-template>
                <ng-template pTemplate="content">
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </span>
                </ng-template>
            </p-inplace>
        </div>
        <app-code [code]="code" selector="inplace-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-inplace>
    <ng-template pTemplate="display">
        <span>View Content</span>
    </ng-template>
    <ng-template pTemplate="content">
        <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </span>
    </ng-template>
</p-inplace>`,
        html: `<div class="card">
    <p-inplace>
        <ng-template pTemplate="display">
            <span>View Content</span>
        </ng-template>
        <ng-template pTemplate="content">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
        </ng-template>
    </p-inplace>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';

@Component({
    selector: 'inplace-basic-demo',
    templateUrl: './inplace-basic-demo.html',
    standalone: true,
    imports: [InplaceModule]
})
export class InplaceBasicDemo {}`
    };
}
