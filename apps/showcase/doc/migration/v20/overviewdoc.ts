import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';

import { Component } from '@angular/core';

@Component({
    selector: 'v20-migration-overview-doc',
    imports: [AppDocModule, AppCodeModule],
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG v20 is an evolution rather than a revolution compared to v18/v19 that introduced the brand new theming architecture. V20 focuses on <b>form enhancements</b> along with the <b>primeuix migration</b> for shared theming between
                all Prime projects including PrimeVue, PrimeReact and the upcoming projects such as PrimeUI web components. As of v20, PrimeNG has switched PrimeNG to semantic versioning, and as a result changes are iterative, with a smooth migration
                strategy and no breaking changes. In the future versions, same approach will be put in action and migrations will be trivial with no breaking changes.
            </p>
        </app-docsectiontext>
    `
})
export class OverviewDoc {}
