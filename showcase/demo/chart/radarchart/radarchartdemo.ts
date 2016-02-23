import {Component} from 'angular2/core';
import {RadarChart} from '../../../../components/chart/radarchart/radarchart';
import {pCode} from '../../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../../components/tabview/tabview';
import {TabPanel} from '../../../../components/tabview/tabpanel';
import {Growl} from '../../../../components/growl/growl';
import {Button} from '../../../../components/button/button';
import {Message} from '../../../../components/api/message';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/chart/radarchart/radarchartdemo.html',
    directives: [RadarChart,Button,Growl,TabPanel,TabView,pCode,ROUTER_DIRECTIVES]
})
export class RadarChartDemo {

    data: any;

    msgs: Message[];

    constructor() {
        this.data = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        }
    }

    onSelect(event) {
        if(event.points) {
            this.msgs = [];
            for(var i = 0; i < event.points.length; i++) {
                this.msgs.push({severity: 'info', summary: 'Point Selected', 'detail': event.points[i].label + ' ' + event.points[i].value});
            }

        }
    }
}