import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CheckboxDoc } from './checkboxdoc';
import { ContextMenuDoc } from './contextmenudoc';
import { ControlledDoc } from './controlleddoc';
import { DragDropDoc } from './dragdropdoc';
import { EventDoc } from './eventdoc';
import { EventsDoc } from './eventsdoc';
import { FilterDoc } from './filterdoc';
import { ImportDoc } from './importdoc';
import { LazyDoc } from './lazydoc';
import { MethodsDoc } from './methodsdoc';
import { MultipleDoc } from './multipledoc';
import { PropsDoc } from './propsdoc';
import { SingleDoc } from './singledoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TreeModule, ButtonModule, InputSwitchModule, FormsModule, ToastModule, ContextMenuModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, ControlledDoc, SingleDoc, MultipleDoc, CheckboxDoc, EventDoc, LazyDoc, TemplateDoc, DragDropDoc, ContextMenuDoc, FilterDoc, StyleDoc, PropsDoc, EventsDoc, MethodsDoc, TemplatesDoc, AccessibilityDoc]
})
export class TreeDocModule {}
