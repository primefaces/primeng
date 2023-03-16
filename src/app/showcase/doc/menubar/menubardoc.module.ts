import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { MenubarTemplateDemo } from './templatedoc';
import { MenubarBasicDemo } from './basicdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MenubarModule, InputTextModule, AppDocModule],
    declarations: [MenubarBasicDemo, ImportDoc, MenuItemDoc, PropsDoc, StyleDoc, MenubarTemplateDemo, TemplatesDoc],
    exports: [AppDocModule]
})
export class MenubarDocModule {}
