import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from '@alamote/primeng/checkbox';
import { ColorsDoc } from './accessibility/colorsdoc';
import { FormControlsDoc } from './accessibility/formcontrolsdoc';
import { IntroductionDoc } from './accessibility/introductiondoc';
import { SemanticHTMLDoc } from './accessibility/semantichtmldoc';
import { WAIARIADoc } from './accessibility/waiariadoc';
import { WCAGDoc } from './accessibility/wcagdoc';
import { SpecificityDoc } from './csslayer/specificitydoc';
import { ResetDoc } from './csslayer/resetdoc';
import { InputSwitchModule } from '@alamote/primeng/inputswitch';
import { TailwindDoc } from './csslayer/tailwinddoc';
import { BootstrapDoc } from './csslayer/bootstrapdoc';
import { NormalizeDoc } from './csslayer/normalizedoc';
@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule, FormsModule, CheckboxModule, InputSwitchModule],
    exports: [AppDocModule],
    declarations: [ColorsDoc, FormControlsDoc, IntroductionDoc, SemanticHTMLDoc, WAIARIADoc, WCAGDoc, SpecificityDoc, ResetDoc, TailwindDoc, BootstrapDoc, NormalizeDoc]
})
export class GuidesDocModule {}
