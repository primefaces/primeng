import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from '../../../components/inputtext/inputtext';
import { IconsComponent } from './icons.component';
import { IconsRoutingModule } from './icons-routing.module';
import { CodeHighlighterModule } from '../../../components/codehighlighter/codehighlighter';

@NgModule({
    imports: [
        CommonModule,
        InputTextModule,
        CodeHighlighterModule,
        IconsRoutingModule
    ],
    declarations: [
        IconsComponent
    ]
})
export class IconsModule { }