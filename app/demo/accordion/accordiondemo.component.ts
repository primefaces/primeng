import {Component} from 'angular2/core';
import {AccordionComponent} from '../../components/accordion/accordion.component';
import {AccordionTabComponent} from '../../components/accordion/accordiontab.component'
import {ButtonDirective} from '../../components/button/button.directive';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/accordion/accordiondemo.component.html',
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