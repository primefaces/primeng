import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { LongContentDoc } from './longcontentdoc';
import { ResponsiveDoc } from './responsivedoc';
import { PositionDoc } from './positiondoc';
import { MaximizableDoc } from './maximizabledoc';
import { TemplateDoc } from './templatedoc';
import { OverlaysInsideDoc } from './overlaysinsidedoc';
import { ModalDoc } from './modaldoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, FormsModule, DialogModule, ButtonModule, DropdownModule, AppDocModule],
    declarations: [BasicDoc, EventsDoc, ImportDoc, PropsDoc, StyleDoc, LongContentDoc, ResponsiveDoc, PositionDoc, MaximizableDoc, TemplateDoc, OverlaysInsideDoc, ModalDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class DialogDocModule {}
