import {Component} from 'angular2/core';
import {Accordion} from '../../components/accordion/accordion';
import {AccordionTab} from '../../components/accordion/accordiontab'
import {Button} from '../../components/button/button';
import {TabView} from '../../components/tabview/tabview';
import {TabPanel} from '../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/accordion/accordiondemo.component.html',
    directives: [Accordion,AccordionTab,Button,TabView,TabPanel,ROUTER_DIRECTIVES]
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