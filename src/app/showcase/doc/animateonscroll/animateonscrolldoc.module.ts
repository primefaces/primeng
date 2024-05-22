import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, AnimateOnScrollModule],
    declarations: [ImportDoc, BasicDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class AnimateOnScrollDocModule {}
