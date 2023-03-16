import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { GMapModule } from 'primeng/gmap';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { AppDemoActionsModule } from '../../layout/demoactions/app.demoactions.component';
import { GMapDemo } from './gmapdemo';
import { GMapDemoRoutingModule } from './gmapdemo-routing.module';

@NgModule({
    imports: [CommonModule, FormsModule, GMapDemoRoutingModule, GMapModule, ToastModule, InputTextModule, CheckboxModule, DialogModule, ButtonModule, TabViewModule, AppCodeModule, AppDemoActionsModule],
    declarations: [GMapDemo]
})
export class GMapDemoModule {}
