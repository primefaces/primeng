import {Component} from '@angular/core';
import {UIChart} from '../../../../components/chart/chart';
import {CodeHighlighter} from '../../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../../components/tabview/tabview';
import {TabPanel} from '../../../../components/tabview/tabpanel';
import {Growl} from '../../../../components/growl/growl';
import {Button} from '../../../../components/button/button';
import {Message} from '../../../../components/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/chart/linechart/linechartdemo.html',
    directives: [UIChart,Button,Growl,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class LineChartDemo {

    data: any;
    
    msgs: Message[];

    constructor() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false
                }
            ]
        }
    }

    selectData(event) {
        this.msgs = [];
        //this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.data[0]._datasetIndex].data[event.data[0]._index]});
    }
}