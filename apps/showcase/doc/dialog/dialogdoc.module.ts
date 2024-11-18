import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoFocusModule } from 'primeng/autofocus';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { HeadlessDoc } from './headlessdoc';
import { ImportDoc } from './importdoc';
import { LongContentDoc } from './longcontentdoc';
import { MaximizableDoc } from './maximizabledoc';
import { ModalDoc } from './modaldoc';
import { OverlaysInsideDoc } from './overlaysinsidedoc';
import { PositionDoc } from './positiondoc';
import { ResponsiveDoc } from './responsivedoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { WithoutModalDoc } from './withoutmodaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, FormsModule, Dialog, ButtonModule, DropdownModule, AppDocModule, InputTextModule, AvatarModule, AutoFocusModule],
    declarations: [BasicDoc, ImportDoc, StyleDoc, LongContentDoc, ResponsiveDoc, PositionDoc, MaximizableDoc, TemplateDoc, OverlaysInsideDoc, ModalDoc, AccessibilityDoc, HeadlessDoc, WithoutModalDoc],
    exports: [AppDocModule, LongContentDoc]
})
export class DialogDocModule {}
