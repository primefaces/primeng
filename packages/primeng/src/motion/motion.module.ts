import { NgModule } from '@angular/core';
import { Motion } from './motion.component';
import { MotionDirective } from './motion.directive';

export * from './motion.component';
export * from './motion.directive';

@NgModule({
    imports: [Motion, MotionDirective],
    exports: [Motion, MotionDirective]
})
export class MotionModule {}
