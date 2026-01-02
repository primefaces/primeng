import { Component } from '@angular/core';

@Component({
    selector: 'tailwind-doc',
    template: `
        <app-docsectiontext>
            <p>
                Tailwind CSS includes a reset utility in base called
                <a href="https://tailwindcss.com/docs/preflight" target="_blank" rel="noopener noreferrer" class="doc-link">preflight</a>. If you are using this feature, wrap the base and utilities in separate layers and make sure primeng layer comes
                after the base.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" selector="tailwind-demo" [hideToggleCode]="true"></app-code>
    `
})
export class TailwindDoc {
    code = {
        basic: `@layer tailwind-base, primeng, tailwind-utilities;

@layer tailwind-base {
    @tailwind base;
}

@layer tailwind-utilities {
    @tailwind components;
    @tailwind utilities;
}`
    };
}
