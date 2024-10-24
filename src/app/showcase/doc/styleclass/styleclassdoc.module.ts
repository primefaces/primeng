import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { ToggleClassDoc } from './toggleclassdoc';
import { ImportDoc } from './importdoc';
import { StyleClassModule } from 'primengrtl/styleclass';
import { ButtonModule } from 'primengrtl/button';
import { InputTextModule } from 'primengrtl/inputtext';
import { AnimationDoc } from './animationdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, StyleClassModule, ButtonModule, InputTextModule],
    declarations: [ImportDoc, ToggleClassDoc, AnimationDoc],
    exports: [AppDocModule]
})
export class StyleClassDocModule {}
