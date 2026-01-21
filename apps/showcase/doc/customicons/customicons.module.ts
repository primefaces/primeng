import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
