import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'virtual-scroll-doc',
    standalone: true,
    imports: [TreeModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-tree [value]="nodes()" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="35" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class VirtualScrollDoc implements OnInit {
    nodes = signal<TreeNode[]>(undefined);

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodes.set(this.nodeService.generateNodes(150));
    }
}
