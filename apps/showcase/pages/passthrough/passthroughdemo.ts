import { AppDoc } from '@/components/doc/app.doc';
import { GlobalDoc } from '@/doc/guides/passthrough/global-doc';
import { InstanceDoc } from '@/doc/guides/passthrough/instance-doc';
import { IntroductionDoc } from '@/doc/guides/passthrough/introduction-doc';
import { LifeCycleDoc } from '@/doc/guides/passthrough/lifecycle-doc';
import { PcPrefixDoc } from '@/doc/guides/passthrough/pcprefix-doc';
import { PTOptionsDoc } from '@/doc/guides/passthrough/ptoptions-doc';
import { Component } from '@angular/core';

@Component({
    selector: 'passthrough',
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="PrimeNG - Pass Through" header="Pass Through" description="The Pass Through attributes is an API to customize the internal DOM Structure of the components." [docs]="docs" docType="page"></app-doc> `
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
            id: 'instance',
            label: 'Instance',
            component: InstanceDoc
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
            id: 'ptoptions',
            label: 'PT Options',
            component: PTOptionsDoc
        }
    ];
}
