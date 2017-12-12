import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {DataScrollerDemo} from './datascrollerdemo';
import {DataScrollerInfiniteDemo} from './datascrollerinfinitedemo';
import {DataScrollerInlineDemo} from './datascrollerinlinedemo';
import {DataScrollerLoaderDemo} from './datascrollerloaderdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path: '',component: DataScrollerDemo},
            {path: 'inline', component: DataScrollerInlineDemo},
            {path: 'loader', component: DataScrollerLoaderDemo},
            {path: 'infinite', component: DataScrollerInfiniteDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DatascrollerDemoRoutingModule {}
