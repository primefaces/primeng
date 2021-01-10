import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { IconsRoutingModule } from './icons-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
    imports: [
        CommonModule,
        InputTextModule,
        AppCodeModule,
        IconsRoutingModule
    ],
    declarations: [
        IconsComponent
    ]
})
export class IconsModule { }