import { ApiDoc } from '@/doc/filterservice/apidoc';
import { BuiltInConstraintsDoc } from '@/doc/filterservice/builtinconstraintsdoc';
import { CustomConstraintsDoc } from '@/doc/filterservice/customconstraintsdoc';
import { ImportDoc } from '@/doc/filterservice/importdoc';
import { TableIntegrationDoc } from '@/doc/filterservice/tableintegrationdoc';
import { UsageDoc } from '@/doc/filterservice/usagedoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="FilterService - PrimeNG" header="FilterService" description="FilterService is a helper utility to filter collections against constraints." [docs]="docs"></app-doc>`
})
export class FilterServiceDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'builtinconstraints',
            label: 'Built-in Constraints',
            component: BuiltInConstraintsDoc
        },
        {
            id: 'customconstraints',
            label: 'Custom Constraints',
            component: CustomConstraintsDoc
        },
        {
            id: 'table-integration',
            label: 'Table Integration',
            component: TableIntegrationDoc
        },
        {
            id: 'api',
            label: 'FilterService API',
            component: ApiDoc
        }
    ];
}
