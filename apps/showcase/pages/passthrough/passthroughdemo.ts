import { AppDoc } from '@/components/doc/app.doc';
import { CustomCssDoc } from '@/doc/guides/passthrough/customcssdoc';
import { GlobalDoc } from '@/doc/guides/passthrough/globaldoc';
import { IntroductionDoc } from '@/doc/guides/passthrough/introductiondoc';
import { LifeCycleDoc } from '@/doc/guides/passthrough/lifecycledoc';
import { PcPrefixDoc } from '@/doc/guides/passthrough/pcprefixdoc';
import { UsePassThroughDoc } from '@/doc/guides/passthrough/usepassthroughdoc';
import { Component } from '@angular/core';

@Component({
    selector: 'passthrough',
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="PrimeNG - Pass Through" header="Pass Through" description="The Pass Through attributes is an API to customize the internal DOM Structure of the components." [docs]="docs"></app-doc> `
})
export class PassThroughDemoComponent {
    docs = [
        {
            id: 'introduction',
            label: 'Introduction',
            component: IntroductionDoc
        },
        {
            id: 'pc-prefix',
            label: 'PC Prefix',
            component: PcPrefixDoc
        },
        {
            id: 'life-cycle',
            label: 'Lifecycle',
            component: LifeCycleDoc
        },
        {
            id: 'global',
            label: 'Global',
            component: GlobalDoc
        },
        {
            id: 'custom-css',
            label: 'Custom CSS',
            component: CustomCssDoc
        },
        {
            id: 'use-pt',
            label: 'UsePassThrough',
            component: UsePassThroughDoc
        }
    ];
}
