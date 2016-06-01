import {Component} from '@angular/core';
import {Dialog} from '../../../components/dialog/dialog';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/dialog/dialogdemo.html',
    directives: [Dialog,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class DialogDemo {

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
    }

}