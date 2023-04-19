import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnimateDocModule } from '../../doc/animate/animatedoc.module';
import { AnimateDemoRoutingModule } from './animate-routing.module';
import { AnimateDemo } from './animatedemo';

@NgModule({
    imports: [CommonModule, AnimateDemoRoutingModule, AnimateDocModule],
    declarations: [AnimateDemo]
})
export class AnimateDemoModule {}
