import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Checkbox } from 'primeng/checkbox';
import { ColorsDoc } from './accessibility/colorsdoc';
import { FormControlsDoc } from './accessibility/formcontrolsdoc';
import { IntroductionDoc } from './accessibility/introductiondoc';
import { SemanticHTMLDoc } from './accessibility/semantichtmldoc';
import { WAIARIADoc } from './accessibility/waiariadoc';
import { WCAGDoc } from './accessibility/wcagdoc';
import { BootstrapDoc } from './csslayer/bootstrapdoc';
import { NormalizeDoc } from './csslayer/normalizedoc';
import { ResetDoc } from './csslayer/resetdoc';
import { SpecificityDoc } from './csslayer/specificitydoc';
import { TailwindDoc } from './csslayer/tailwinddoc';
import { CompatibilityDoc } from './primeflex/compatibilitydoc';
import { MigrationDoc } from './primeflex/migrationdoc';
import { OverviewDoc } from './primeflex/overviewdoc';
import { TailwindCSSDoc } from './primeflex/tailwindcssdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule, FormsModule, Checkbox],
    exports: [AppDocModule],
    declarations: [ColorsDoc, FormControlsDoc, IntroductionDoc, SemanticHTMLDoc, WAIARIADoc, WCAGDoc, SpecificityDoc, ResetDoc, TailwindDoc, BootstrapDoc, NormalizeDoc, OverviewDoc, CompatibilityDoc, TailwindCSSDoc, MigrationDoc]
})
export class GuidesDocModule {}
