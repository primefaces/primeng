import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorsDoc } from './accessibility/colorsdoc';
import { FormControlsDoc } from './accessibility/formcontrolsdoc';
import { IntroductionDoc } from './accessibility/introductiondoc';
import { SemanticHTMLDoc } from './accessibility/semantichtmldoc';
import { WAIARIADoc } from './accessibility/waiariadoc';
import { WCAGDoc } from './accessibility/wcagdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule, FormsModule, CheckboxModule],
    exports: [AppDocModule],
    declarations: [ColorsDoc, FormControlsDoc, IntroductionDoc, SemanticHTMLDoc, WAIARIADoc, WCAGDoc]
})
export class GuidesDocModule {}
