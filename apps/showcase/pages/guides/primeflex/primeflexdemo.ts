import { CompatibilityDoc } from '@/doc/guides/primeflex/compatibilitydoc';
import { MigrationDoc } from '@/doc/guides/primeflex/migrationdoc';
import { OverviewDoc } from '@/doc/guides/primeflex/overviewdoc';
import { TailwindCSSDoc } from '@/doc/guides/primeflex/tailwindcssdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    selector: 'css-layer',
    standalone: true,
    imports: [AppDoc],
    template: `<app-doc docTitle="PrimeFlex - PrimeNG" header="Introduction" [docs]="docs" description="Moving from PrimeFlex to Tailwind CSS."></app-doc>`
})
export class PrimeFlexDemoComponent {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: OverviewDoc
        },
        {
            id: 'compatibility',
            label: 'Compatibility',
            component: CompatibilityDoc
        },
        {
            id: 'tailwindcss',
            label: 'Tailwind CSS',
            component: TailwindCSSDoc
        },
        {
            id: 'migration',
            label: 'Migration',
            component: MigrationDoc
        }
    ];
}
