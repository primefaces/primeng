import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {pCode} from '../../../components/codehighlighter/codehighlighter';

@Component ({
    styles:[`
        .ui-grid {
            margin-bottom: 10px;
        }

        .ui-grid .ui-grid-row div {
            background-color: #cccccc;
            text-align: center;
            border: 1px solid #dddddd;
            padding: 10px 0px;
        }
    `],
    templateUrl: 'showcase/demo/grid/griddemo.html',
    directives: [TabView,TabPanel,pCode]
})
export class GridDemo {

}