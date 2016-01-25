import {Component} from 'angular2/core';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';

@Component ({
    styles:[`
        .pui-grid {
            margin-bottom: 10px;
        }

        .pui-grid .pui-grid-row div {
            background-color: #cccccc;
            text-align: center;
            border: 1px solid #dddddd;
            padding: 10px 0px;
        }
    `],
    templateUrl: 'app/demo/grid/griddemo.component.html',
    directives: [TabViewComponent,TabPanelComponent]
})
export class GridDemoComponent {

}