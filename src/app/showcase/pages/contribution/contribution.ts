import { Component } from '@angular/core';
import { BenefitsDoc } from '@doc/contribution/benefitsdoc';
import { ClaDoc } from '@doc/contribution/cladoc';
import { CommunicationDoc } from '@doc/contribution/communicationdoc';
import { HelpNeededDoc } from '@doc/contribution/helpneededdoc';
import { IntroductionDoc } from '@doc/contribution/introductiondoc';
import { KeyPointsDoc } from '@doc/contribution/keypoints';
import { PathwayDoc } from '@doc/contribution/pathwaydoc';

@Component({
    templateUrl: './contribution.component.html'
})
export class ContributionComponent {
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
