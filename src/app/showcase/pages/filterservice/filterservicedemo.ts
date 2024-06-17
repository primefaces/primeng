import { Component } from '@angular/core';
import { ApiDoc } from '@doc/filterservice/apidoc';
import { BuiltInConstraintsDoc } from '@doc/filterservice/builtinconstraintsdoc';
import { CustomConstraintsDoc } from '@doc/filterservice/customconstraintsdoc';
import { ImportDoc } from '@doc/filterservice/importdoc';
import { UsageDoc } from '@doc/filterservice/usagedoc';
import { TableIntegrationDoc } from '@doc/filterservice/tableintegrationdoc';

@Component({
    templateUrl: './filterservicedemo.html'
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
