import { AppDoc } from '@/components/doc/app.doc';
import { BasicDoc } from '@/doc/guides/passthrough/basicdoc';
import { GlobalDoc } from '@/doc/guides/passthrough/globaldoc';
import { IntroductionDoc } from '@/doc/guides/passthrough/introductiondoc';
import { PcPrefixDoc } from '@/doc/guides/passthrough/pcprefixdoc';
import { Component } from '@angular/core';

@Component({
    selector: 'passthrough',
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Pass Through - PrimeNG" header="Pass Through" description="The Pass Through attributes is an API to access the internal DOM Structure of the components." [docs]="docs"></app-doc> `
})
export class PassThroughDemoComponent {
    docs = [
        {
            id: 'introduction',
            label: 'Introduction',
            component: IntroductionDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'pc-prefix',
            label: 'PC Prefix',
            component: PcPrefixDoc
        },
        {
            id: 'global',
            label: 'Global',
            component: GlobalDoc
        }
    ];
}
