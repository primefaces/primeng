import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component, OnInit, signal } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'single-drag-drop-doc',
    standalone: true,
    imports: [TreeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Nodes can be reordered within the same tree and also can be transferred between other trees using drag&drop.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tree [value]="files()" class="w-full md:w-[30rem]" [draggableNodes]="true" [droppableNodes]="true" draggableScope="self" droppableScope="self" />
        </div>
        <app-code [code]="code" selector="tree-single-drag-drop-demo"></app-code>
    `,
    providers: [TreeDragDropService]
})
export class SingleDragDropDoc implements OnInit {
    files = signal<TreeNode[]>(undefined);

    ngOnInit() {
        this.files.set([
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
    }

    code: Code = {
        basic: `<p-tree [value]="files()" class="w-full md:w-[30rem]" [draggableNodes]="true" [droppableNodes]="true" draggableScope="self" droppableScope="self" />`,

        html: `<div class="card">
    <p-tree [value]="files()" class="w-full md:w-[30rem]" [draggableNodes]="true" [droppableNodes]="true" draggableScope="self" droppableScope="self" />
</div>`,

        typescript: `import { Component, OnInit, signal } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

@Component({
    selector: 'tree-single-drag-drop-demo',
    templateUrl: './tree-single-drag-drop-demo.html',
    standalone: true,
    imports: [Tree],
    providers: [TreeDragDropService]
})
export class TreeSingleDragDropDemo implements OnInit {
    files = signal<TreeNode[]>(undefined);

    ngOnInit() {
        this.files.set([
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
    }
}`
    };
}
