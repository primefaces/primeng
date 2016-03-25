import {Component} from 'angular2/core';
import {Editor} from '../../../components/editor/editor';
import {Header} from '../../../components/common/header';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/editor/editordemo.html',
    directives: [Editor,Header,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class EditorDemo {

    text1: string = '<div>Hello World!</div><div>PrimeNG <b>bold</b> Rocks</div><div><br></div>';
    
    text2: string;
}