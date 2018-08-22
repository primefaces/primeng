import {Component,OnInit,ViewChild} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {MenuItem,TreeNode} from '../../../components/common/api';
import {Tree} from '../../../components/tree/tree';
import {TreeDragDropService} from '../../../components/common/api';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './treedemo.html',
    styles:[`
        h4 {
            text-align: center;
            margin: 0 0 8px 0;
        }
    `],
    providers: [TreeDragDropService,MessageService]
})
export class TreeDemo implements OnInit {

  public tree: TreeNode[] = [];
  public selection: TreeNode[] = [];
  public items: any[] = [];

  public msg = '';

  ngOnInit() {
    this.loadMockData();
    this.filter(null);
  }

  loadMockData() {
    const items = []
    for (let i = 0; i < 2000; i++) {
      items.push({ id: i, name: `Item X-${i}`, category: 'X' })
    }
    for (let i = 0; i < 2000; i++) {
      items.push({ id: i, name: `Item Y-${i}`, category: 'Y' })
    }
    for (let i = 0; i < 2000; i++) {
      items.push({ id: i, name: `Item Z-${i}`, category: 'Z' })
    }
    this.items = items;
  }

  filter(filter: string) {
    if (filter === 'A') {
      this.buildTree(it => it.id % 2 == 1)
    } else if (filter === 'B') {
      this.buildTree(it => it.id > 800)
    } else {
      this.buildTree(it => true);
    }
  }

  buildTree(extraFilter: (any) => boolean) {
    this.msg = '';
    const startTime = new Date().getTime();
    const root: TreeNode[] = [];
    ['X', 'Y', 'Z'].forEach(category => {
      root.push({
        label: category,
        data: null,
        expanded: true,
        children: this.items.filter(it => it.category === category).filter(extraFilter).map(it => {
          return {
            label: it.name,
            data: it,
            expanded: true,
            selectable: true
          };
        }),
        selectable: true
      })
    });
    this.tree = root;
    // reselect sample data
    const selection = [];
    this.tree.forEach(node => {
      selection.push(...node.children.filter(it => it.data && it.data.id % 3 == 0));
    });
    this.selection = selection;
    const rebuildTime = new Date().getTime() - startTime;
    this.msg =`(${new Date().toUTCString()}): Rebuild takes only ${rebuildTime} ms`;
  }
}
