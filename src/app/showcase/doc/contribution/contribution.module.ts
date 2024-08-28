import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { IntroductionDoc } from './introductiondoc';
import { HelpNeededDoc } from './helpneededdoc';
import { CommunicationDoc } from './communicationdoc';
import { PathwayDoc } from './pathwaydoc';
import { BenefitsDoc } from './benefitsdoc';
import { ClaDoc } from './cladoc';
import { KeyPointsDoc } from './keypoints';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule],
    declarations: [IntroductionDoc, HelpNeededDoc, KeyPointsDoc, CommunicationDoc, PathwayDoc, BenefitsDoc, ClaDoc],
    exports: [AppDocModule]
})
export class ContributionDocModule {}
