import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {GMapDemo} from './gmapdemo';
import {GMapDemoRoutingModule} from './gmapdemo-routing.module';
import {GMapModule} from '../../../components/gmap/gmap';
import {GrowlModule} from '../../../components/growl/growl';
import {CheckboxModule} from '../../../components/checkbox/checkbox';
import {DialogModule} from '../../../components/dialog/dialog';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		GMapDemoRoutingModule,
        GMapModule,
        GrowlModule,
        CheckboxModule,
        DialogModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		GMapDemo
	]
})
export class GMapDemoModule {}
