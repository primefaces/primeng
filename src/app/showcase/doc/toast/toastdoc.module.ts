import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ImportDoc } from './importdoc';
import { ToastAnimationDemo } from './animationdoc';
import { ToastBasicDemo } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { InterfaceDoc } from './interfacedoc';
import { ToastMultipleDemo } from './multipledoc';
import { ToastPositionDemo } from './positiondoc';
import { PropsDoc } from './propsdoc';
import { ToastResponsiveDemo } from './responsivedoc';
import { ToastSeverityDemo } from './severitydoc';
import { ToastStickyDemo } from './stickydoc';
import { StyleDoc } from './styledoc';
import { ToastTargetDemo } from './targetdoc';
import { ToastTemplateDemo } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';
import { ToastClearDemo } from './cleardoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ToastModule, ButtonModule, RippleModule],
    declarations: [
        ToastAnimationDemo,
        ToastBasicDemo,
        EventsDoc,
        ImportDoc,
        InterfaceDoc,
        ToastMultipleDemo,
        ToastPositionDemo,
        PropsDoc,
        ToastResponsiveDemo,
        ToastSeverityDemo,
        ToastStickyDemo,
        StyleDoc,
        ToastTargetDemo,
        ToastTemplateDemo,
        TemplatesDoc,
        ToastClearDemo
    ],
    exports: [AppDocModule]
})
export class ToastDocModule {}
