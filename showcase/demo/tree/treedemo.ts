import {Component} from 'angular2/core';
import {Tree} from '../../../components/tree/tree';
import {TreeNode} from '../../../components/api/treenode';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/tree/treedemo.html',
    directives: [Tree,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class TreeDemo {
    
    nodes: TreeNode[];
}