import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PrimeFlexSetup} from './primeflexsetup';
import {DisplayDemo} from './displaydemo';
import {ElevationDemo} from './elevationdemo';
import {FlexBoxDemo} from './flexboxdemo';
import {FormLayoutDemo} from './formlayoutdemo';
import {GridDemo} from './griddemo';
import {SpacingDemo} from './spacingdemo';
import {TextDemo} from './textdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
            {path:'',component: PrimeFlexSetup},
            {path:'display',component: DisplayDemo},
            {path:'elevation',component: ElevationDemo},
            {path:'flexbox',component: FlexBoxDemo},
            {path:'formlayout',component: FormLayoutDemo},
            {path:'grid',component: GridDemo},
            {path:'spacing',component: SpacingDemo},
            {path:'text',component: TextDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class PrimeFlexDemoRoutingModule {}
