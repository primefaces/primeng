import {Component} from 'angular2/core';
import {Editor} from '../../../components/editor/editor';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/editor/editordemo.html',
    directives: [Editor,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class EditorDemo {

    text: string;
}