import {Component} from 'angular2/core';
import {InputText} from '../../../components/inputtext/inputtext';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/inputtext/inputtextdemo.html',
    directives: [InputText,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class InputTextDemo {

    text: string;

    disabled: boolean = true;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}