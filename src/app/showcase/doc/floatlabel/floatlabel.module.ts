import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { BasicDoc } from './basicdoc';

import { ImportDoc } from './importdoc';
import { FloatLabelModule } from 'primeng/floatlabel';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, GalleriaModule, FormsModule, ButtonModule, FloatLabelModule],
    declarations: [BasicDoc, ImportDoc],
    exports: [AppDocModule]
})
export class FloatLabelDocModule {}
