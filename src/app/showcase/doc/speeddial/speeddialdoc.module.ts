import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesModule } from '@alamote/primeng/messages';
import { SpeedDialModule } from '@alamote/primeng/speeddial';
import { ToastModule } from '@alamote/primeng/toast';
import { TooltipModule } from '@alamote/primeng/tooltip';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { CircleDoc } from './circledoc';
import { CustomDoc } from './customdoc';
import { ImportDoc } from './importdoc';
import { LinearDoc } from './lineardoc';
import { MaskDoc } from './maskdoc';
import { QuarterCircleDoc } from './quartercircledoc';
import { SemiCircleDoc } from './semicircledoc';
import { StyleDoc } from './styledoc';
import { TooltipDoc } from './tooltipdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, SpeedDialModule, MessagesModule, ToastModule, TooltipModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, LinearDoc, CircleDoc, SemiCircleDoc, QuarterCircleDoc, TooltipDoc, MaskDoc, CustomDoc, StyleDoc, AccessibilityDoc]
})
export class SpeedDialDocModule {}
