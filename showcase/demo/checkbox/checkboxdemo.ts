import {Component} from 'angular2/core';
import {Checkbox} from '../../../components/checkbox/checkbox';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/checkbox/checkboxdemo.html',
    styles: [`
        .ui-grid .ui-grid-col-1,
        .ui-grid .ui-grid-col-11 {
            padding: 4px 10px;
        }

        .ui-grid label {
            display: block;
            margin: 2px 0 0 4px;
        }
    `],
    directives: [Checkbox,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class CheckboxDemo {

    selectedCities: string[] = [];

    selectedCategories: string[] = ['Technology', 'Sports'];
    
    checked: boolean = false;
}