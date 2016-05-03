import {Component,OnInit} from '@angular/core';
import {TreeTable} from '../../../components/treetable/treetable';
import {Column} from '../../../components/column/column';
import {TreeNode} from '../../../components/api/treenode';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTP_PROVIDERS}    from '@angular/http';
import {NodeService} from '../service/nodeservice';
import {Growl} from '../../../components/growl/growl';
import {Message} from '../../../components/api/message';
import {Header} from '../../../components/common/header';

@Component({
    templateUrl: 'showcase/demo/treetable/treetabledemo.html',
    directives: [TreeTable,Column,TabView,Growl,TabPanel,Header,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,NodeService]
})
export class TreeTableDemo implements OnInit {
    
    msgs: Message[];
    
    files: TreeNode[];
    
    lazyFiles: TreeNode[];
        
    selectedFile: TreeNode;
    
    selectedFiles: TreeNode[];
        
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files = files);
        this.nodeService.getLazyFilesystem().then(files => this.lazyFiles = files);
    }
    
    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.data.name});
    }
    
    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.data.name});
    }
    
    nodeExpand(event) {
        if(event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFilesystem().then(nodes => event.node.children = nodes);
        }
    }
}