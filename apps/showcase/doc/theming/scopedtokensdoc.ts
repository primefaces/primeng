import { Component } from '@angular/core';

@Component({
    selector: 'scoped-tokens-doc',
    template: `
        <app-docsectiontext>
            <p>Design tokens can be scoped to a certain component using CSS variables. In this example, first switch uses the global tokens whereas second one overrides the global with its own tokens.</p>
        </app-docsectiontext>
        <div class="card flex gap-2 justify-center items-center">
            <p-toggleswitch [(ngModel)]="checked1" />
            <p-toggleswitch [(ngModel)]="checked2" [dt]="amberSwitch" />
        </div>
        <app-code [code]="code" selector="scoped-tokens-demo" [hideToggleCode]="true"></app-code>
    `
})
export class ScopedTokensDoc {
    checked1: boolean = true;

    checked2: boolean = true;

    amberSwitch = {
        handle: {
            borderRadius: '4px'
        },
        colorScheme: {
            light: {
                root: {
                    checkedBackground: '{amber.500}',
                    checkedHoverBackground: '{amber.600}',
                    borderRadius: '4px'
                },
                handle: {
                    checkedBackground: '{amber.50}',
                    checkedHoverBackground: '{amber.100}'
                }
            },
            dark: {
                root: {
                    checkedBackground: '{amber.400}',
                    checkedHoverBackground: '{amber.300}',
                    borderRadius: '4px'
                },
                handle: {
                    checkedBackground: '{amber.900}',
                    checkedHoverBackground: '{amber.800}'
                }
            }
        }
    };

    code = {
        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
    template: \` 
        <p-toggleswitch [(ngModel)]="checked1"/>
        <p-toggleswitch [(ngModel)]="checked2" [dt]="amberSwitch"/>
    \`,
    standalone: true,
    imports: [ToggleSwitch, FormsModule]
})
export class AppComponent {
    checked1: boolean = true;

    checked2: boolean = true;

    amberSwitch = {
        handle: {
            borderRadius: '4px'
        },
        colorScheme: {
            light: {
                root: {
                    checkedBackground: '{amber.500}',
                    checkedHoverBackground: '{amber.600}',
                    borderRadius: '4px'
                },
                handle: {
                    checkedBackground: '{amber.50}',
                    checkedHoverBackground: '{amber.100}'
                }
            },
            dark: {
                root: {
                    checkedBackground: '{amber.400}',
                    checkedHoverBackground: '{amber.300}',
                    borderRadius: '4px'
                },
                handle: {
                    checkedBackground: '{amber.900}',
                    checkedHoverBackground: '{amber.800}'
                }
            }
        }
    };
}`
    };
}
