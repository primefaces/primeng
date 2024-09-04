import { Component } from '@angular/core';
import { MigrationDoc } from '@doc/guides/primeflex/migrationdoc';
import { OverviewDoc } from '@doc/guides/primeflex/overviewdoc';
import { PluginDoc } from '@doc/guides/primeflex/plugindoc';
import { TailwindCSSDoc } from '@doc/guides/primeflex/tailwindcssdoc';

@Component({
    selector: 'css-layer',
    templateUrl: './primeflexdemo.component.html',
})
export class PrimeFlexDemoComponent {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: OverviewDoc,
        },
        {
            id: 'tailwindcss',
            label: 'Tailwind CSS',
            component: TailwindCSSDoc,
        },
        {
            id: 'plugin',
            label: 'Plugin',
            component: PluginDoc,
        },
        {
            id: 'migration',
            label: 'Migration',
            component: MigrationDoc,
        },
    ];
}
