import {Component} from 'angular2/core';
import {Dialog} from '../../../components/dialog/dialog';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/dialog/dialogdemo.component.html',
    directives: [Dialog,Button,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class DialogDemoComponent {

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

}