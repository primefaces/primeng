import {Component} from '@angular/core';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/chart/chartdemo.html',
    directives: [CodeHighlighter,ROUTER_DIRECTIVES]
})
export class ChartDemo {
    
}