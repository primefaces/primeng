import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component, OnInit, signal } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'multiple-drag-drop-doc',
    standalone: true,
    imports: [TreeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Nodes can be transferred between multiple trees as well. The <i>draggableScope</i> and <i>droppableScope</i> properties defines keys to restrict the actions between trees. In this example, nodes can only be transferred from start to
                the end.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-col md:flex-row gap-4">
            <p-tree [value]="value1()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" draggableScope="first" droppableScope="none">
                <ng-template #empty> No Items Left </ng-template>
            </p-tree>
            <p-tree [value]="value2()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" draggableScope="second" droppableScope="first">
                <ng-template #empty> Drag Nodes Here </ng-template>
            </p-tree>
            <p-tree [value]="value3()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" [droppableScope]="['first', 'second']">
                <ng-template #empty> Drag Nodes Here </ng-template>
            </p-tree>
        </div>
        <app-code [code]="code" selector="tree-multiple-drag-drop-demo"></app-code>
    `,
    providers: [TreeDragDropService]
})
export class MultipleDragDropDoc implements OnInit {
    value1 = signal<TreeNode[]>(undefined);

    value2 = signal<TreeNode[]>(undefined);

    value3 = signal<TreeNode[]>(undefined);

    ngOnInit() {
        this.value1.set([
            {
                key: '0',
                label: '.github',
                data: '.github folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '0-0',
                        label: 'workflows',
                        data: 'workflows folder',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            {
                                key: '0-0-0',
                                label: 'node.js.yml',
                                data: 'node.js.yml file',
                                icon: 'pi pi-fw pi-file'
                            }
                        ]
                    }
                ]
            },
            {
                key: '1',
                label: '.vscode',
                data: '.vscode folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '1-0',
                        label: 'extensions.json',
                        data: 'extensions.json file',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            {
                key: '2',
                label: 'public',
                data: 'public folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '2-0',
                        label: 'vite.svg',
                        data: 'vite.svg file',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            {
                key: '3',
                label: 'src',
                data: 'src folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '3-0',
                        label: 'assets',
                        data: 'assets folder',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            {
                                key: '3-0-0',
                                label: 'vue.svg',
                                data: 'vue.svg file',
                                icon: 'pi pi-fw pi-file'
                            }
                        ]
                    },
                    {
                        key: '3-1',
                        label: 'components',
                        data: 'components folder',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            {
                                key: '3-1-0',
                                label: 'HelloWorld.vue',
                                data: 'HelloWorld.vue file',
                                icon: 'pi pi-fw pi-file'
                            }
                        ]
                    },
                    {
                        key: '3-2',
                        label: 'App.vue',
                        data: 'App.vue file',
                        icon: 'pi pi-fw pi-file'
                    },
                    {
                        key: '3-3',
                        label: 'main.js',
                        data: 'main.js file',
                        icon: 'pi pi-fw pi-file'
                    },
                    {
                        key: '3-4',
                        label: 'style.css',
                        data: 'style.css file',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            {
                key: '4',
                label: 'index.html',
                data: 'index.html file',
                icon: 'pi pi-fw pi-file'
            },
            {
                key: '5',
                label: 'package.json',
                data: 'package.json file',
                icon: 'pi pi-fw pi-file'
            },
            {
                key: '6',
                label: 'vite.config.js',
                data: 'vite.config.js file',
                icon: 'pi pi-fw pi-file'
            }
        ]);

        this.value2.set([
            {
                key: '1-0',
                label: '/etc',
                icon: 'pi pi-fw pi-folder'
            }
        ]);

        this.value3.set([]);
    }

    code: Code = {
        basic: `<p-tree [value]="value1()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" draggableScope="first" droppableScope="none">
    <ng-template #empty> No Items Left </ng-template>
</p-tree>
<p-tree [value]="value2()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" draggableScope="second" droppableScope="first">
    <ng-template #empty> Drag Nodes Here </ng-template>
</p-tree>
<p-tree [value]="value3()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" [droppableScope]="['first', 'second']">
    <ng-template #empty> Drag Nodes Here </ng-template>
</p-tree>`,

        html: `<div class="card flex flex-col md:flex-row gap-4">
    <p-tree [value]="value1()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" draggableScope="first" droppableScope="none">
        <ng-template #empty> No Items Left </ng-template>
    </p-tree>
    <p-tree [value]="value2()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" draggableScope="second" droppableScope="first">
        <ng-template #empty> Drag Nodes Here </ng-template>
    </p-tree>
    <p-tree [value]="value3()" class="flex-1 border border-surface rounded-lg" [draggableNodes]="true" [droppableNodes]="true" [droppableScope]="['first', 'second']">
        <ng-template #empty> Drag Nodes Here </ng-template>
    </p-tree>
</div>`,

        typescript: `import { Component, OnInit, signal } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

@Component({
    selector: 'tree-multiple-drag-drop-demo',
    templateUrl: './tree-multiple-drag-drop-demo.html',
    standalone: true,
    imports: [Tree],
    providers: [TreeDragDropService]
})
export class TreeMultipleDragDropDemo implements OnInit {
    value1 = signal<TreeNode[]>(undefined);

    value2 = signal<TreeNode[]>(undefined);

    value3 = signal<TreeNode[]>(undefined);

    ngOnInit() {
        this.value1.set([
            {
                key: '0',
                label: '.github',
                data: '.github folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '0-0',
                        label: 'workflows',
                        data: 'workflows folder',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            {
                                key: '0-0-0',
                                label: 'node.js.yml',
                                data: 'node.js.yml file',
                                icon: 'pi pi-fw pi-file'
                            }
                        ]
                    }
                ]
            },
            {
                key: '1',
                label: '.vscode',
                data: '.vscode folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '1-0',
                        label: 'extensions.json',
                        data: 'extensions.json file',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            {
                key: '2',
                label: 'public',
                data: 'public folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '2-0',
                        label: 'vite.svg',
                        data: 'vite.svg file',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            {
                key: '3',
                label: 'src',
                data: 'src folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '3-0',
                        label: 'assets',
                        data: 'assets folder',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            {
                                key: '3-0-0',
                                label: 'vue.svg',
                                data: 'vue.svg file',
                                icon: 'pi pi-fw pi-file'
                            }
                        ]
                    },
                    {
                        key: '3-1',
                        label: 'components',
                        data: 'components folder',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            {
                                key: '3-1-0',
                                label: 'HelloWorld.vue',
                                data: 'HelloWorld.vue file',
                                icon: 'pi pi-fw pi-file'
                            }
                        ]
                    },
                    {
                        key: '3-2',
                        label: 'App.vue',
                        data: 'App.vue file',
                        icon: 'pi pi-fw pi-file'
                    },
                    {
                        key: '3-3',
                        label: 'main.js',
                        data: 'main.js file',
                        icon: 'pi pi-fw pi-file'
                    },
                    {
                        key: '3-4',
                        label: 'style.css',
                        data: 'style.css file',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            {
                key: '4',
                label: 'index.html',
                data: 'index.html file',
                icon: 'pi pi-fw pi-file'
            },
            {
                key: '5',
                label: 'package.json',
                data: 'package.json file',
                icon: 'pi pi-fw pi-file'
            },
            {
                key: '6',
                label: 'vite.config.js',
                data: 'vite.config.js file',
                icon: 'pi pi-fw pi-file'
            }
        ]);

        this.value2.set([
            {
                key: '1-0',
                label: '/etc',
                icon: 'pi pi-fw pi-folder'
            }
        ]);

        this.value3.set([]);
    }
}`
    };
}
