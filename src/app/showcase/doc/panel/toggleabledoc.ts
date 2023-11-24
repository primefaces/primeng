import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'toggleable-doc',
    template: `
        <app-docsectiontext>
            <p>
                Content of the panel can be expanded and collapsed using <i>toggleable</i> option, default state is defined with collapsed option. By default, toggle icon is used to toggle the contents whereas setting toggler to "header" enables
                clicking anywhere in the header to trigger a toggle.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-panel header="Header" [toggleable]="true">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
        </div>
        <app-code [code]="code" selector="panel-toggleable-demo"></app-code>
    `
})
export class ToggleableDoc {
    code: Code = {
        basic: `
<p-panel header="Header" [toggleable]="true">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-panel>`,

        html: `
<div class="card flex justify-content-center">
    <p-panel header="Header" [toggleable]="true">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-panel>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'panel-toggleable-demo',
    templateUrl: './panel-toggleable-demo.html'
})
export class PanelToggleableDemo {}`
    };
}
