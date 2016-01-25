import {Component} from 'angular2/core';
import {FieldsetComponent} from '../fieldset.component';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl:'app/components/fieldset/demo/fieldsetdemo.component.html',
    directives: [FieldsetComponent,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class FieldsetDemoComponent {

}