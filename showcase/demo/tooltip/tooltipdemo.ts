import {Component} from '@angular/core';
import {TabView} from '../../../components/tabview/tabview';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Tooltip} from '../../../components/tooltip/tooltip';
import {InputText} from '../../../components/inputtext/inputtext';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/tooltip/tooltipdemo.html',
    directives: [CodeHighlighter,Tooltip,InputText,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class TooltipDemo {

}