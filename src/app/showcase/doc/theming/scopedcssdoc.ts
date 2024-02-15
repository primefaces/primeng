import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scoped-css-doc',
    styles: [
        `
            :host ::ng-deep .p-panel-header {
                background-color: var(--teal-500);
                border-color: var(--teal-500);
                color: #ffffff;
            }

            :host ::ng-deep .p-panel-content {
                border-color: var(--teal-500);
            }
        `
    ],
    template: `
        <app-docsectiontext>
            <p>Theming styles the components globally, in case you require to change the style of a certain component use <i>::ng-deep</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-panel header="Scoped Panel">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
        </div>
        <app-code [code]="code" selector="scoped-css-demo"></app-code>
    `
})
export class ScopedCSSDoc {
    code: Code = {
        basic: `<p-panel header="Scoped Panel">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-panel>`,
        html: `
<p-panel header="Scoped Panel">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-panel>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'scoped-css-demo',
    styles: [
        \`
            :host ::ng-deep .p-panel-header {
                background-color: var(--teal-500);
                border-color: var(--teal-500);
                color: #ffffff;
            }

            :host ::ng-deep .p-panel-content {
                border-color: var(--teal-500);
            }
        \`
    ],
    templateUrl: './scoped-css-demo.html'
})
export class ScopedCssDemo {}`
    };
}
