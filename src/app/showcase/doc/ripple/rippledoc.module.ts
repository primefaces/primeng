import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { CustomDoc } from './customdoc';
import { DefaultDoc } from './defaultdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, RippleModule],
    declarations: [DefaultDoc, ImportDoc, StyleDoc, CustomDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class RippleDocModule {}
