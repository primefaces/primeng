import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ClosableDoc } from './closabledoc';
import { DynamicDoc } from './dynamicdoc';
import { FormDoc } from './formdoc';
import { IconDoc } from './icondoc';
import { ImportDoc } from './importdoc';
import { LifeDoc } from './lifedoc';
import { OutlinedDoc } from './outlineddoc';
import { SeverityDoc } from './severitydoc';
import { SimpleDoc } from './simpledoc';
import { SizesDoc } from './sizesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MessageModule, AppDocModule, AvatarModule, InputTextModule, ButtonModule],
    declarations: [BasicDoc, SeverityDoc, ImportDoc, IconDoc, FormDoc, DynamicDoc, ClosableDoc, LifeDoc, SizesDoc, OutlinedDoc, SimpleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class MessageDocModule {}
