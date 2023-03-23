import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { OverviewDoc } from './overviewdoc';
import { PaletteDoc } from './palettedoc';
import { SurfacesDoc } from './surfacesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppDocModule, AppCodeModule],
    exports: [AppDocModule],
    declarations: [OverviewDoc, SurfacesDoc, PaletteDoc]
})
export class ColorsDocModule {}
