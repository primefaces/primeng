import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselDemo} from './carouseldemo';
import {CarouselDemoRoutingModule} from './carouseldemo-routing.module';
import {CarouselModule} from '../../../components/carousel/carousel';
import {ButtonModule} from '../../../components/button/button';
import {GrowlModule} from '../../../components/growl/growl';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        CarouselDemoRoutingModule,
        CarouselModule,
        ButtonModule,
        GrowlModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		CarouselDemo
	]
})
export class CarouselDemoModule {}
