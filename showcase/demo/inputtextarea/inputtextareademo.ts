import {Component} from 'angular2/core';
import {InputTextarea} from '../../../components/inputtextarea/inputtextarea';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/inputtextarea/inputtextareademo.html',
    directives: [InputTextarea,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class InputTextareaDemo {

}