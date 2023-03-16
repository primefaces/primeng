import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AnimationsDoc } from './animationsdoc';
import { FilterModeDoc } from './filtermodedoc';
import { ImportDoc } from './importdoc';
import { RippleDoc } from './rippledoc';
import { ZIndexDoc } from './zindexdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule],
    exports: [AppDocModule],
    declarations: [AnimationsDoc, FilterModeDoc, ImportDoc, RippleDoc, ZIndexDoc]
})
export class ConfigurationDocModule {}
