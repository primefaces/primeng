import {Component} from '@angular/core';
import {Fieldset} from '../../../components/fieldset/fieldset';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/fieldset/fieldsetdemo.html',
    directives: [Fieldset,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class FieldsetDemo {

}