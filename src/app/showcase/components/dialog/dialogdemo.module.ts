import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDemo } from './dialogdemo';
import { DialogDemoRoutingModule } from './dialogdemo-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AppCodeModule } from '../../app.code.component';
import { AppDemoActionsModule } from '../../app.demoactions.component';
import {RippleModule} from "primeng/ripple";

@NgModule({
    imports: [CommonModule, DialogDemoRoutingModule, DialogModule, ButtonModule, AppCodeModule, AppDemoActionsModule, TabViewModule, RippleModule],
    declarations: [DialogDemo]
})
export class DialogDemoModule {}
