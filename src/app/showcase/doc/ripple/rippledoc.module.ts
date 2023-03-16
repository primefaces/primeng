import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { RippleCustomDemo } from './customdoc';
import { RippleDefaultDemo } from './defaultdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, RippleModule],
    declarations: [RippleDefaultDemo, ImportDoc, StyleDoc, RippleCustomDemo],
    exports: [AppDocModule]
})
export class RippleDocModule {}
