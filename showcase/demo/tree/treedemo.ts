import {Component,OnInit} from '@angular/core';
import {Tree} from '../../../components/tree/tree';
import {TreeNode} from '../../../components/api/treenode';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTP_PROVIDERS}    from '@angular/http';
import {NodeService} from '../service/nodeservice';
import {Growl} from '../../../components/growl/growl';
import {Message} from '../../../components/api/message';

@Component({
    templateUrl: 'showcase/demo/tree/treedemo.html',
    directives: [Tree,TabView,Growl,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,NodeService]
})
export class TreeDemo implements OnInit {
    
    msgs: Message[];
    
    files: TreeNode[];
    
    lazyFiles: TreeNode[];
    
    selectedFile: TreeNode;
    
    selectedFiles: TreeNode[];
        
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files = files);
        this.nodeService.getLazyFiles().then(files => this.lazyFiles = files);
    }
    
    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
    }
    
    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }
    
    nodeExpand(event) {
        if(event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);
        }
    }
}