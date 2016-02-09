import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';

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
    templateUrl: 'showcase/demo/grid/griddemo.component.html',
    directives: [TabView,TabPanel]
})
export class GridDemoComponent {

}