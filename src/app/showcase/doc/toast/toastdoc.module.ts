import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ImportDoc } from './importdoc';
import { AnimationDoc } from './animationdoc';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { InterfaceDoc } from './interfacedoc';
import { MultipleDoc } from './multipledoc';
import { PositionDoc } from './positiondoc';
import { PropsDoc } from './propsdoc';
import { ResponsiveDoc } from './responsivedoc';
import { SeverityDoc } from './severitydoc';
import { StickyDoc } from './stickydoc';
import { StyleDoc } from './styledoc';
import { TargetDoc } from './targetdoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';
import { ClearDoc } from './cleardoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ToastModule, ButtonModule, RippleModule],
    declarations: [AnimationDoc, BasicDoc, EventsDoc, ImportDoc, InterfaceDoc, MultipleDoc, PositionDoc, PropsDoc, ResponsiveDoc, SeverityDoc, StickyDoc, StyleDoc, TargetDoc, TemplateDoc, TemplatesDoc, ClearDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ToastDocModule {}
