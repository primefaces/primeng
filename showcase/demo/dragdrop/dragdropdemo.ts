import {Component} from 'angular2/core';
import {Draggable} from '../../../components/dragdrop/draggable';
import {Droppable} from '../../../components/dragdrop/droppable';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/dragdrop/dragdropdemo.html',
    directives: [Draggable,Droppable,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class DragDropDemo {

}