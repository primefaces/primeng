import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ContextMenu } from 'primeng/contextmenu';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CommandDoc } from './commanddoc';
import { DocumentDoc } from './documentdoc';
import { ImportDoc } from './importdoc';
import { RouterDoc } from './routerdoc';
import { StyleDoc } from './styledoc';
import { TableDoc } from './tabledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, ContextMenu, AppDocModule, Tag, ToastModule, BadgeModule],
    declarations: [BasicDoc, ImportDoc, DocumentDoc, TemplateDoc, CommandDoc, RouterDoc, TableDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ContextMenuDocModule {}
