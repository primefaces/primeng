import {Component} from '@angular/core';
import {UIChart} from '../../../../components/chart/chart';
import {CodeHighlighter} from '../../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../../components/tabview/tabview';
import {TabPanel} from '../../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/chart/polarareachart/polarareachartdemo.html',
    directives: [UIChart,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class PolarAreaChartDemo {

    data: any;

    constructor() {
        this.data = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3,
                    14
                ],
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ]
        }
    }
}