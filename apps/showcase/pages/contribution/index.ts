import { Component } from '@angular/core';
import { BenefitsDoc } from '@/doc/contribution/benefitsdoc';
import { ContributionDocModule } from '../../doc/contribution/contribution.module';
import { IntroductionDoc } from '@/doc/contribution/introductiondoc';
import { HelpNeededDoc } from '@/doc/contribution/helpneededdoc';
import { KeyPointsDoc } from '@/doc/contribution/keypointsdoc';
import { CommunicationDoc } from '@/doc/contribution/communicationdoc';
import { PathwayDoc } from '@/doc/contribution/pathwaydoc';
import { ClaDoc } from '@/doc/contribution/cladoc';

@Component({
    standalone: true,
    imports: [ContributionDocModule],
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
