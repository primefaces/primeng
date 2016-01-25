import {Component} from 'angular2/core';
import {InputTextareaDirective} from '../inputtextarea.directive';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/components/inputtextarea/demo/inputtextareademo.component.html',
    directives: [InputTextareaDirective,TabPanelComponent,TabViewComponent,ROUTER_DIRECTIVES]
})
export class InputTextareaDemoComponent {

}