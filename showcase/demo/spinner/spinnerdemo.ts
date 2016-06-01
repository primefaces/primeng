import {Component} from '@angular/core';
import {Spinner} from '../../../components/spinner/spinner';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/spinner/spinnerdemo.html',
    directives: [Spinner,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class SpinnerDemo {

    val1: number;

    val2: number;

    val3: number;

    val4: number = 100;
}