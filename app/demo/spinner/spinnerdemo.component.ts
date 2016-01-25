import {Component} from 'angular2/core';
import {SpinnerDirective} from '../../components/spinner/spinner.directive';
import {ButtonDirective} from '../../components/button/button.directive';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/spinner/spinnerdemo.component.html',
    directives: [SpinnerDirective,ButtonDirective,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class SpinnerDemoComponent {

    val1: number;

    val2: number;

    val3: number;

   val4: number = 100;
}