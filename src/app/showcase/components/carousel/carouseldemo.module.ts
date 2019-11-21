import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselDemo} from './carouseldemo';
import {CarouselDemoRoutingModule} from './carouseldemo-routing.module';
import {CarouselModule} from '../../../components/carousel/carousel';
import {ButtonModule} from '../../../components/button/button';
import {ToastModule} from '../../../components/toast/toast';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        CarouselDemoRoutingModule,
        CarouselModule,
        ButtonModule,
        ToastModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		CarouselDemo
	]
})
export class CarouselDemoModule {}
