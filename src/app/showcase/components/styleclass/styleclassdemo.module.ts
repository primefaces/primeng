import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { TabViewModule } from 'primeng/tabview';
import { AppCodeModule } from '../../app.code.component';
import { AppDemoActionsModule } from '../../app.demoactions.component';
import { StyleClassDemo } from './styleclassdemo';
import { StyleClassDemoRoutingModule } from './styleclassdemo-routing.module';

@NgModule({
    imports: [CommonModule, StyleClassDemoRoutingModule, FormsModule, ButtonModule, InputTextModule, StyleClassModule, AppCodeModule, TabViewModule, AppDemoActionsModule],
    declarations: [StyleClassDemo]
})
export class StyleClassDemoModule {}
