import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { AppDemoActionsModule } from '../../layout/demoactions/app.demoactions.component';
import { ScrollerDemo } from './scrollerdemo';
import { ScrollerDemoRoutingModule } from './scrollerdemo-routing.module';

@NgModule({
    imports: [CommonModule, ScrollerModule, ScrollerDemoRoutingModule, SkeletonModule, TabViewModule, AppCodeModule, AppDemoActionsModule],
    declarations: [ScrollerDemo]
})
export class ScrollerDemoModule {}
