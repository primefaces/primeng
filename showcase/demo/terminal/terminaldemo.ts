import {Component} from '@angular/core';
import {Terminal} from '../../../components/terminal/terminal';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/terminal/terminaldemo.html',
    directives: [Terminal,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class TerminalDemo {
    
    response: string;

    onCommand(event) {
        if(event.command === 'date')
            this.response = new Date().toDateString();
        else
            this.response = 'Unknown command: ' + event.command;
    }
}