import {Component} from '@angular/core';
import {RadioButton} from '../../../components/radiobutton/radiobutton';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/radiobutton/radiobuttondemo.html',
    styles: [`
        .ui-grid label {
            display: inline-block;
            margin: 3px 0px 0px 4px;
        }
    `],
    directives: [RadioButton,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class RadioButtonDemo {

    val1: string;

    val2: string = 'Option 2';
}