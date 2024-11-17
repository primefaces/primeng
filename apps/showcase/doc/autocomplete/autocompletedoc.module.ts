import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { DropdownDoc } from './dropdowndoc';
import { FilledDoc } from './filleddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { ForceSelectionDoc } from './forceselectiondoc';
import { GroupDoc } from './groupdoc';
import { IftaLabelDoc } from './iftalabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MultipleDoc } from './multipledoc';
import { ObjectsDoc } from './objectsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { VirtualScrollDoc } from './virtualscrolldoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, FormsModule, AppDocModule, AutoCompleteModule, ReactiveFormsModule, RouterModule, FloatLabelModule, IftaLabelModule, ButtonModule],
    exports: [AppDocModule],
    declarations: [
        ImportDoc,
        BasicDoc,
        TemplateDoc,
        GroupDoc,
        VirtualScrollDoc,
        MultipleDoc,
        StyleDoc,
        AccessibilityDoc,
        DropdownDoc,
        ForceSelectionDoc,
        ObjectsDoc,
        ReactiveFormsDoc,
        FloatLabelDoc,
        IftaLabelDoc,
        DisabledDoc,
        InvalidDoc,
        FilledDoc,
        SizesDoc
    ]
})
export class AutoCompleteDocModule {}
