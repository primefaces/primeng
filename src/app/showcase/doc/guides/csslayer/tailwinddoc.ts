import { Component } from '@angular/core';
import { Code } from 'src/app/showcase/domain/code';

@Component({
    selector: 'tailwind-doc',

    template: `
        <app-docsectiontext>
            <p>
                Tailwind CSS includes a reset utility in base called <a href="https://tailwindcss.com/docs/preflight" target="_blank" rel="noopener noreferrer">preflight</a>. If you are using this feature, wrap the base and utilities in separate
                layers and make sure primeNG layer comes after the base.
            </p>
            <app-code [code]="code" selector="tailwind-demo" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>
        </app-docsectiontext>
    `
})
export class TailwindDoc {
    code: Code = {
        basic: `@layer tailwind-base, primeng, tailwind-utilities;
        
@layer tailwind-base {
    @tailwind base;
}

@layer tailwind-utilities {
    @tailwind components;
    @tailwind utilities;
}
    `
    };
}
