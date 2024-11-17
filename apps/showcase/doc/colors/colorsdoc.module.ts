import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverviewDoc } from './overviewdoc';
import { PaletteDoc } from './palettedoc';
import { SurfacesDoc } from './surfacesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppDocModule, AppCodeModule],
    exports: [AppDocModule],
    declarations: [OverviewDoc, SurfacesDoc, PaletteDoc]
})
export class ColorsDocModule {}
