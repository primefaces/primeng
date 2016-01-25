import {Component} from 'angular2/core';
import {PanelComponent} from '../panel.component';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/components/panel/demo/paneldemo.component.html',
    directives: [PanelComponent,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class PanelDemoComponent {

}