import { AppDoc } from '@/components/doc/app.doc';
import { ArchitectureDoc } from '@/doc/theming/unstyled/architecture-doc';
import { ExampleDoc } from '@/doc/theming/unstyled/example-doc';
import { GlobalDoc } from '@/doc/theming/unstyled/global-doc';
import { SetupDoc } from '@/doc/theming/unstyled/setup-doc';
import { VoltUIDoc } from '@/doc/theming/unstyled/voltui-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Unstyled Mode" header="Unstyled" description="Theming PrimeNG with alternative styling approaches." [docs]="docs" docType="page"></app-doc>`,
    imports: [AppDoc],
    standalone: true
})
export class ThemingUnstyledDemo {
    docs = [
        {
            id: 'architecture',
            label: 'Architecture',
            component: ArchitectureDoc
        },
        {
            id: 'setup',
            label: 'Setup',
            component: SetupDoc
        },
        {
            id: 'example',
            label: 'Example',
            component: ExampleDoc
        },
        {
            id: 'global',
            label: 'Global',
            component: GlobalDoc
        },
        {
            id: 'volt',
            label: 'Volt UI',
            component: VoltUIDoc
        }
    ];
}
