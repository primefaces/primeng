import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { Ripple } from 'primeng/ripple';
import { Toast } from 'primeng/toast';
import { AccessibilityDoc } from './accessibilitydoc';
import { AnimationDoc } from './animationdoc';
import { BasicDoc } from './basicdoc';
import { ClearDoc } from './cleardoc';
import { HeadlessDoc } from './headlessdoc';
import { ImportDoc } from './importdoc';
import { LifeDoc } from './lifedoc';
import { MultipleDoc } from './multipledoc';
import { PositionDoc } from './positiondoc';
import { ResponsiveDoc } from './responsivedoc';
import { SeverityDoc } from './severitydoc';
import { StickyDoc } from './stickydoc';
import { StyleDoc } from './styledoc';
import { TargetDoc } from './targetdoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Toast, ButtonModule, Ripple, AvatarModule, ProgressBar],
    declarations: [AnimationDoc, BasicDoc, ImportDoc, MultipleDoc, PositionDoc, ResponsiveDoc, SeverityDoc, LifeDoc, StickyDoc, StyleDoc, TargetDoc, TemplateDoc, ClearDoc, HeadlessDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ToastDocModule {}
