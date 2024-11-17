import { Component } from '@angular/core';

@Component({
    selector: 'dt-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>$dt</i> function returns the information about a token like the full path and value. This would be useful if you need to access tokens programmatically.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="dt-demo" [hideToggleCode]="true"></app-code>
    `
})
export class DtDoc {
    code = {
        typescript: `import { $dt } from 'primeng/themes';

const duration = $dt('transition.duration');
/*
    duration: {
        name: '--transition-duration',
        variable: 'var(--p-transition-duration)',
        value: '0.2s'
    }
*/

const primaryColor = $dt('primary.color');
/*
    primaryColor: {
        name: '--primary-color',
        variable: 'var(--p-primary-color)',
        value: {
        light: {
            value: '#10b981',
            paths: {
                name: 'semantic.primary.color',
                binding: {
                    name: 'primitive.emerald.500'
                }
            }
        },
        dark: {
            value: '#34d399',
            paths: {
                name: 'semantic.primary.color',
                binding: {
                    name: 'primitive.emerald.400'
                }
            }
        }
    }
}
*/`
    };
}
