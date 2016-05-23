import {Component} from '@angular/core';
import {PolarAreaChart} from '../../../../components/chart/polarareachart/polarareachart';
import {CodeHighlighter} from '../../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../../components/tabview/tabview';
import {TabPanel} from '../../../../components/tabview/tabpanel';
import {Growl} from '../../../../components/growl/growl';
import {Button} from '../../../../components/button/button';
import {Message} from '../../../../components/api/message';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/chart/polarareachart/polarareachartdemo.html',
    directives: [PolarAreaChart,Button,Growl,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class PolarAreaChartDemo {

    data: any[];

    msgs: Message[];

    updated: boolean;

    constructor() {
        this.data = [{
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            },
            {
                value: 40,
                color: "#949FB1",
                highlight: "#A8B3C5",
                label: "Grey"
            },
            {
                value: 120,
                color: "#4D5360",
                highlight: "#616774",
                label: "Dark Grey"
            }];
    }

    onSegmentClick(event) {
        if(event.segments) {
            this.msgs = [{severity: 'info', summary: 'Segment Selected', 'detail': event.segments[0].label}];
        }
    }

}