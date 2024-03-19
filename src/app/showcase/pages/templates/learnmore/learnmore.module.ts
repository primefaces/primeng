import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnMoreRoutingModule } from './learnmore-routing.module';
import { LearnMoreComponent } from './learnmore.component';

@NgModule({
    declarations: [LearnMoreComponent],
    imports: [CommonModule, LearnMoreRoutingModule]
})
export class LearnMoreModule {}
