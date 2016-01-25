import {Component} from 'angular2/core';
import {InputTextareaDirective} from '../../components/inputtextarea/inputtextarea.directive';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/inputtextarea/inputtextareademo.component.html',
    directives: [InputTextareaDirective,TabPanelComponent,TabViewComponent,ROUTER_DIRECTIVES]
})
export class InputTextareaDemoComponent {

}