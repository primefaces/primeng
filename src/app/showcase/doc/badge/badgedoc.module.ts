import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ImportDoc } from './importdoc';
import { BadgeBasicDemo } from './basicdoc';
import { BadgeButtonDemo } from './buttondoc';
import { BadgeDirectiveDemo } from './directivedoc';
import { BadgePositionDemo } from './positiondoc';
import { BadgeSeverityDemo } from './severitydoc';
import { BadgeSizeDemo } from './sizedoc';
import { StyleDoc } from './styledoc';
import { PropsDoc } from './propsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, BadgeModule, ButtonModule],
    declarations: [ImportDoc, BadgeBasicDemo, BadgeButtonDemo, BadgeDirectiveDemo, BadgePositionDemo, BadgeSeverityDemo, BadgeSizeDemo, StyleDoc, PropsDoc],
    exports: [AppDocModule]
})
export class BadgeDocModule {}
