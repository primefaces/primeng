import { Component } from '@angular/core';

@Component({
    selector: 'tailwindcss-doc',
    template: `
        <app-docsectiontext>
            <p>
                Tailwind CSS in particular is a popular choice, we have even built the whole showcase with Tailwind CSS. Website templating demos have been migrated from PrimeFlex to Tailwind and a converter tool called <i>pf2tw</i> has been created.
                In summary, PrimeTek officially suggests Tailwind CSS as the replacement for PrimeFlex.
            </p>
        </app-docsectiontext>
    `
})
export class TailwindCSSDoc {}
