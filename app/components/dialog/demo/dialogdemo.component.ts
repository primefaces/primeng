import {Component} from 'angular2/core';
import {DialogComponent} from '../dialog.component';
import {ButtonDirective} from '../../button/button.directive';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/components/dialog/demo/dialogdemo.component.html',
    directives: [DialogComponent, ButtonDirective,TabPanelComponent,TabViewComponent,ROUTER_DIRECTIVES]
})
export class DialogDemoComponent {

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

}