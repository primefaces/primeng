import {Component} from 'angular2/core';
import {AccordionComponent} from '../accordion.component';
import {AccordionTabComponent} from '../accordiontab.component'
import {ButtonDirective} from '../../button/button.directive';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/components/accordion/demo/accordiondemo.component.html',
    directives: [AccordionComponent,AccordionTabComponent,ButtonDirective,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class AccordionDemoComponent {

    activeTabIndex: number = 1; 

    changeTab() {
        var index = this.activeTabIndex;
        index++;
        if(index > 2) {
            index = 0;
        }

        this.activeTabIndex = index;
    }
}