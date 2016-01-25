import {Component} from 'angular2/core';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {ButtonDirective} from '../../components/button/button.directive';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/dialog/dialogdemo.component.html',
    directives: [DialogComponent, ButtonDirective,TabPanelComponent,TabViewComponent,ROUTER_DIRECTIVES]
})
export class DialogDemoComponent {

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

}