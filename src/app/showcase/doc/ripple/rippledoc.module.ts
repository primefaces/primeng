import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { CustomDoc } from './customdoc';
import { DefaultDoc } from './defaultdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, RippleModule],
    declarations: [DefaultDoc, ImportDoc, StyleDoc, CustomDoc],
    exports: [AppDocModule]
})
export class RippleDocModule {}
