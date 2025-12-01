import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
import { ArchitectureDoc } from '@/doc/theming/unstyled/architecturedoc';
import { SetupDoc } from '@/doc/theming/unstyled/setupdoc';
import { ExampleDoc } from '@/doc/theming/unstyled/exampledoc';
import { GlobalDoc } from '@/doc/theming/unstyled/globaldoc';

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
        }
    ];
}
