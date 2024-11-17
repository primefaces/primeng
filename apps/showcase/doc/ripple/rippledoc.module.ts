import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ripple } from 'primeng/ripple';
import { AccessibilityDoc } from './accessibilitydoc';
import { CustomDoc } from './customdoc';
import { DefaultDoc } from './defaultdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Ripple],
    declarations: [DefaultDoc, ImportDoc, StyleDoc, CustomDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class RippleDocModule {}
