import {Component} from 'angular2/core';
import {LineChart} from '../../../../components/chart/linechart/linechart';
import {TabView} from '../../../../components/tabview/tabview';
import {TabPanel} from '../../../../components/tabview/tabpanel';
import {Growl} from '../../../../components/growl/growl';
import {Button} from '../../../../components/button/button';
import {Message} from '../../../../components/api/message';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/chart/linechart/linechartdemo.component.html',
    directives: [LineChart,Button,Growl,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class LineChartDemoComponent {

    data: any;

    msgs: Message[];

    constructor() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0.2)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    fillColor: 'rgba(151,187,205,0.2)',
                    strokeColor: 'rgba(151,187,205,1)',
                    pointColor: 'rgba(151,187,205,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }

    onSelect(event) {
        if(event.points) {
            this.msgs = [];
            for(var i = 0; i < event.points.length; i++) {
                this.msgs.push({severity: 'info', summary: 'Points Selected', 'detail': event.points[i].value});
            }

        }
    }
}