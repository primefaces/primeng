import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ColorsDoc } from './colorsdoc';
import { FormControlsDoc } from './formcontrolsdoc';
import { IntroductionDoc } from './introductiondoc';
import { SemanticHTMLDoc } from './semantichtmldoc';
import { WAIARIADoc } from './waiariadoc';
import { WCAGDoc } from './wcagdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule, FormsModule, CheckboxModule],
    exports: [AppDocModule],
    declarations: [ColorsDoc, FormControlsDoc, IntroductionDoc, SemanticHTMLDoc, WAIARIADoc, WCAGDoc]
})
export class AccessibilityDocModule {}
