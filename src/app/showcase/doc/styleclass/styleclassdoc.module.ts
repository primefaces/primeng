import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { StyleClassToggleClassDemo } from './toggleclassdoc';
import { ImportDoc } from './importdoc';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassAnimationDemo } from './animationdoc';
import { PropsDoc } from './propsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, StyleClassModule, ButtonModule, InputTextModule],
    declarations: [ImportDoc, StyleClassToggleClassDemo, StyleClassAnimationDemo, PropsDoc],
    exports: [AppDocModule]
})
export class StyleClassDocModule {}
