import { Component } from '@angular/core';

@Component({
    selector: 'primary-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>primary</i> defines the main color palette, default value maps to the <i>emerald</i> primitive token. Let's setup to use <i>indigo</i> instead.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="primary-demo" [hideToggleCode]="true"></app-code>
    `
})
export class PrimaryDoc {
    code = {
        typescript: `const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        }
    }
});`
    };
}
