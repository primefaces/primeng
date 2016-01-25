import {Component} from 'angular2/core';
import {FieldsetComponent} from '../../components/fieldset/fieldset.component';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl:'app/demo/fieldset/fieldsetdemo.component.html',
    directives: [FieldsetComponent,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class FieldsetDemoComponent {

}