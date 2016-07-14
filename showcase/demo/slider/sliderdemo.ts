import {Component} from '@angular/core';
import {Slider} from '../../../components/slider/slider';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {InputText} from '../../../components/inputtext/inputtext';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/slider/sliderdemo.html',
    directives: [Slider,InputText,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class SliderDemo {

    val1: number;

    val2: number = 50;

    val3: number;

    val4: number;

    val5: number;
	
	val6: number = 50;
	
	limitedMin: number = 20;
	limitedMax: number = 80;

    rangeValues: number[] = [20,80];
}