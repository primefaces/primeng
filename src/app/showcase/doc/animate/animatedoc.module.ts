import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AnimateImportDemo } from './importdoc';
import { AnimateBasicDemo } from './basicdoc';
import { PropsDoc } from './propsdoc';
import { AnimateModule } from 'primeng/animate';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, AnimateModule],
    declarations: [AnimateImportDemo, AnimateBasicDemo, PropsDoc],
    exports: [AppDocModule]
})
export class AnimateDocModule {}
