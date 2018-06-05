import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { IconsRoutingModule } from './icons-routing.module';
import { CodeHighlighterModule } from '../../../components/codehighlighter/codehighlighter';

@NgModule({
    imports: [
        CommonModule,
        CodeHighlighterModule,
        IconsRoutingModule
    ],
    declarations: [
        IconsComponent
    ]
})
export class IconsModule { }