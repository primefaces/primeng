import {Component,OnInit} from 'angular2/core';
import {Tree} from '../../../components/tree/tree';
import {TreeNode} from '../../../components/api/treenode';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {NodeService} from '../service/nodeservice';

@Component({
    templateUrl: 'showcase/demo/tree/treedemo.html',
    directives: [Tree,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,NodeService]
})
export class TreeDemo implements OnInit {
    
    files: TreeNode[];
        
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files = files);
    }
}