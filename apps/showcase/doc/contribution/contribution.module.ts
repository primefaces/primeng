import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntroductionDoc } from './introductiondoc';
import { HelpNeededDoc } from './helpneededdoc';
import { CommunicationDoc } from './communicationdoc';
import { PathwayDoc } from './pathwaydoc';
import { BenefitsDoc } from './benefitsdoc';
import { ClaDoc } from './cladoc';
import { KeyPointsDoc } from './keypointsdoc';
import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule],
    declarations: [IntroductionDoc, HelpNeededDoc, KeyPointsDoc, CommunicationDoc, PathwayDoc, BenefitsDoc, ClaDoc],
    exports: [AppDocModule]
})
export class ContributionDocModule {}
