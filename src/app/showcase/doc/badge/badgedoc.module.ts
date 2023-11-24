import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { ButtonDoc } from './buttondoc';
import { DirectiveDoc } from './directivedoc';
import { PositionDoc } from './positiondoc';
import { SeverityDoc } from './severitydoc';
import { SizeDoc } from './sizedoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, BadgeModule, ButtonModule],
    declarations: [ImportDoc, BasicDoc, ButtonDoc, DirectiveDoc, PositionDoc, SeverityDoc, SizeDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class BadgeDocModule {}
