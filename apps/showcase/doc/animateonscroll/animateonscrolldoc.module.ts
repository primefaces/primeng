import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, AnimateOnScroll],
    declarations: [ImportDoc, BasicDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class AnimateOnScrollDocModule {}
