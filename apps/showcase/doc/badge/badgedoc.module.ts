import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ButtonDoc } from './buttondoc';
import { DirectiveDoc } from './directivedoc';
import { ImportDoc } from './importdoc';
import { OverlayDoc } from './overlaydoc';
import { PositionDoc } from './positiondoc';
import { SeverityDoc } from './severitydoc';
import { SizeDoc } from './sizedoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, BadgeModule, ButtonModule, OverlayBadgeModule],
    declarations: [ImportDoc, BasicDoc, ButtonDoc, DirectiveDoc, PositionDoc, SeverityDoc, SizeDoc, OverlayDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class BadgeDocModule {}
