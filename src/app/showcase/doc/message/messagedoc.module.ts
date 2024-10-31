import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { IconDoc } from './icondoc';
import { InputTextModule } from 'primeng/inputtext';
import { FormDoc } from './formdoc';
import { ButtonModule } from 'primeng/button';
import { DynamicDoc } from './dynamicdoc';
import { ClosableDoc } from './closabledoc';
import { LifeDoc } from './lifedoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { SeverityDoc } from './severitydoc';
import { SizesDoc } from './sizesdoc';
import { OutlinedDoc } from './outlineddoc';
import { SimpleDoc } from './simpledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MessageModule, AppDocModule, AvatarModule, InputTextModule, ButtonModule],
    declarations: [
        BasicDoc,
        SeverityDoc,
        ImportDoc,
        IconDoc,
        FormDoc,
        DynamicDoc,
        ClosableDoc,
        LifeDoc,
        SizesDoc,
        OutlinedDoc,
        SimpleDoc,
        AccessibilityDoc,
    ],
    exports: [AppDocModule],
})
export class MessageDocModule {}
