import { Component } from '@angular/core';
import { BenefitsDoc } from '@/doc/contribution/benefits-doc';
import { IntroductionDoc } from '@/doc/contribution/introduction-doc';
import { HelpNeededDoc } from '@/doc/contribution/helpneeded-doc';
import { KeyPointsDoc } from '@/doc/contribution/keypoints-doc';
import { CommunicationDoc } from '@/doc/contribution/communication-doc';
import { PathwayDoc } from '@/doc/contribution/pathway-doc';
import { ClaDoc } from '@/doc/contribution/cla-doc';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Contribution - PrimeNG" header="Contribution Guide" description="Welcome to the PrimeNG Contribution Guide and thank you for considering contributing." [docs]="docs"></app-doc> `
})
export class ContributionDemo {
    docs = [
        {
            id: 'introduction',
            label: 'Introduction',
            component: IntroductionDoc
        },
        {
            id: 'helpneeded',
            label: 'Help Needed',
            component: HelpNeededDoc
        },
        {
            id: 'keypoints',
            label: 'Key Points',
            component: KeyPointsDoc
        },
        {
            id: 'communication',
            label: 'Communication',
            component: CommunicationDoc
        },
        {
            id: 'pathway',
            label: 'Pathway',
            component: PathwayDoc
        },
        {
            id: 'benefits',
            label: 'Benefits',
            component: BenefitsDoc
        },
        {
            id: 'cla',
            label: 'CLA',
            component: ClaDoc
        }
    ];
}
