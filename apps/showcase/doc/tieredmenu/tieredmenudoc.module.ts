import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { TieredMenu } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CommandDoc } from './commanddoc';
import { ImportDoc } from './importdoc';
import { PopupDoc } from './popupdoc';
import { RouterDoc } from './routerdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, TieredMenu, ButtonModule, AppDocModule, BadgeModule, ToastModule, FloatLabel],
    declarations: [BasicDoc, ImportDoc, PopupDoc, StyleDoc, AccessibilityDoc, TemplateDoc, CommandDoc, RouterDoc],
    exports: [AppDocModule],
    providers: [MessageService]
})
export class TieredMenuDocModule {}
