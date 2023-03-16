import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RatingDocModule } from '../../doc/rating/ratingdoc.module';
import { RatingDemo } from './ratingdemo';
import { RatingDemoRoutingModule } from './ratingdemo-routing.module';

@NgModule({
    imports: [CommonModule, RatingDemoRoutingModule, RatingDocModule],
    declarations: [RatingDemo]
})
export class RatingDemoModule {}
