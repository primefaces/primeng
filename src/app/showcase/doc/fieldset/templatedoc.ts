import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'fieldset-template-demo',
    template: `
        <app-docsectiontext>
            <p>Header section can also be defined with custom content instead of primitive values.</p>
        </app-docsectiontext>
        <div class="card">
            <p-fieldset>
                <ng-template pTemplate="header">
                    <div class="flex align-items-center gap-2 px-2">
                        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold">Amy Elsner</span>
                    </div>
                </ng-template>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-fieldset>
        </div>
        <app-code [code]="code" selector="fieldset-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-fieldset>
    <ng-template pTemplate="header">
        <div class="flex align-items-center gap-2 px-2">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold">Amy Elsner</span>
        </div>
    </ng-template>
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-fieldset>`,

        html: `<div class="card">
<p-fieldset>
<ng-template pTemplate="header">
    <div class="flex align-items-center gap-2 px-2">
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
        <span class="font-bold">Amy Elsner</span>
    </div>
</ng-template>
<p class="m-0">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</p-fieldset>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'fieldset-template-demo',
    templateUrl: './fieldset-template-demo.html',
    standalone: true,
    imports: [FieldsetModule, AvatarModule]
})
export class FieldsetTemplateDemo {}`
    };
}
