import {Component} from 'angular2/core';
import {ToggleButtonComponent} from '../togglebutton.component';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/components/togglebutton/demo/togglebuttondemo.component.html',
    directives: [ToggleButtonComponent, TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class ToggleButtonDemoComponent {
    
    checked1: boolean = false;

    checked2: boolean = true;
}