import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'fieldset-toggleable-demo',
    template: `
        <app-docsectiontext>
            <p>Content of the fieldset can be expanded and collapsed using <i>toggleable</i> option, default state is defined with collapsed option.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-fieldset legend="Header" [toggleable]="true">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-fieldset>
        </div>
        <app-code [code]="code" selector="fieldset-toggleable-demo"></app-code>
    `
})
export class ToggleableDoc {
    code: Code = {
        basic: `<p-fieldset legend="Header" [toggleable]="true">
    <p>
        Lorem ipsum dolor sit amet...
    </p>
</p-fieldset>`,

        html: `<div class="card flex justify-content-center">
    <p-fieldset legend="Header" [toggleable]="true">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-fieldset>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
    selector: 'fieldset-toggleable-demo',
    templateUrl: './fieldset-toggleable-demo.html',
    standalone: true,
    imports: [FieldsetModule]
})
export class FieldsetToggleableDemo {}`
    };
}
