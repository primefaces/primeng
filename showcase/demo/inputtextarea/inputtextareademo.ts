import {Component} from 'angular2/core';
import {InputTextarea} from '../../../components/inputtextarea/inputtextarea';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/inputtextarea/inputtextareademo.html',
    directives: [InputTextarea,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class InputTextareaDemo {

}