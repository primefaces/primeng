import {Component} from 'angular2/core';
import {SpinnerDirective} from '../spinner.directive';
import {ButtonDirective} from '../../button/button.directive';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/components/spinner/demo/spinnerdemo.component.html',
    directives: [SpinnerDirective,ButtonDirective,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class SpinnerDemoComponent {

    val1: number;

    val2: number;

    val3: number;

   val4: number = 100;
}