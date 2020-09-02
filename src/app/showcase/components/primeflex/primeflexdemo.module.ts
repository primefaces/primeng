import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {PrimeFlexSetup} from './primeflexsetup';
import {DisplayDemo} from './displaydemo';
import {ElevationDemo} from './elevationdemo';
import {FlexBoxDemo} from './flexboxdemo';
import {FormLayoutDemo} from './formlayoutdemo';
import {GridDemo} from './griddemo';
import {SpacingDemo} from './spacingdemo';
import {TextDemo} from './textdemo';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {RippleModule} from 'primeng/ripple';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PrimeFlexDemoRoutingModule} from './primeflexdemo-routing.module';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        PanelModule,
        DropdownModule,
        InputTextareaModule,
        RippleModule,
		PrimeFlexDemoRoutingModule,
		TabViewModule,
		AppCodeModule,
        AppInputStyleSwitchModule
	],
	declarations: [
        PrimeFlexSetup,
        DisplayDemo,
        ElevationDemo,
        FlexBoxDemo,
        FormLayoutDemo,
        GridDemo,
        SpacingDemo,
        TextDemo
	]
})
export class PrimeFlexDemoModule {}
