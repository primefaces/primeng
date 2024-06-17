import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { AvatarModule } from 'primeng/avatar';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { LongContentDoc } from './longcontentdoc';
import { ResponsiveDoc } from './responsivedoc';
import { PositionDoc } from './positiondoc';
import { MaximizableDoc } from './maximizabledoc';
import { TemplateDoc } from './templatedoc';
import { OverlaysInsideDoc } from './overlaysinsidedoc';
import { ModalDoc } from './modaldoc';
import { HeadlessDoc } from './headlessdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { WithoutModalDoc } from './withoutmodaldoc';
@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, FormsModule, DialogModule, ButtonModule, DropdownModule, AppDocModule, InputTextModule, AvatarModule, AutoFocusModule],
    declarations: [BasicDoc, ImportDoc, StyleDoc, LongContentDoc, ResponsiveDoc, PositionDoc, MaximizableDoc, TemplateDoc, OverlaysInsideDoc, ModalDoc, AccessibilityDoc, HeadlessDoc, WithoutModalDoc],
    exports: [AppDocModule]
})
export class DialogDocModule {}
