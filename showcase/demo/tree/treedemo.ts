import {Component,OnInit} from 'angular2/core';
import {Tree} from '../../../components/tree/tree';
import {TreeNode} from '../../../components/api/treenode';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
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
    
    selectedFile: TreeNode;
    
    selectedFiles: TreeNode[];
        
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files = files);
    }
    
    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
    }
    
    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }
}