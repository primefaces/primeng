import {Component} from 'angular2/core';
import {Slider} from '../../../components/slider/slider';
import {Button} from '../../../components/button/button';
import {InputText} from '../../../components/inputtext/inputtext';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/slider/sliderdemo.html',
    directives: [Slider,InputText,Button,TabView,TabPanel,ROUTER_DIRECTIVES]
})
export class SliderDemo {

    val1: number;

    val2: number = 50;

    val3: number;

    val4: number;

    val5: number;

    rangeValues: number[] = [20,80];
}