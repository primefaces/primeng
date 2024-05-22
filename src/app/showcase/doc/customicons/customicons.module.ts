import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { FontAwesomeDoc } from './fontawesomedoc';
import { ImageDoc } from './imagedoc';
import { MaterialDoc } from './materialdoc';
import { SVGDoc } from './svgdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule],
    declarations: [FontAwesomeDoc, MaterialDoc, SVGDoc, ImageDoc],
    exports: [AppDocModule]
})
export class CustomIconsDocModule {}
