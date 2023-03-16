import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogDocModule } from '../../doc/dialog/dialogdoc.module';
import { DialogDemo } from './dialogdemo';
import { DialogDemoRoutingModule } from './dialogdemo-routing.module';

@NgModule({
    imports: [CommonModule, DialogDemoRoutingModule, DialogDocModule],
    declarations: [DialogDemo]
})
export class DialogDemoModule {}
