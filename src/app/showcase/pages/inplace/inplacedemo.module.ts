import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';
import { InplaceDocModule } from '../../doc/inplace/inplacedoc.module';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { InplaceDemo } from './inplacedemo';
import { InplaceDemoRoutingModule } from './inplacedemo-routing.module';

@NgModule({
    imports: [CommonModule, InplaceDemoRoutingModule, InplaceModule, AppDocModule, InplaceDocModule],
    declarations: [InplaceDemo]
})
export class InplaceDemoModule {}
