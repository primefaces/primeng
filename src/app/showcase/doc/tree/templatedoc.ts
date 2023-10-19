import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Custom node content instead of a node label is defined with the <i>pTemplate</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tree [value]="nodes" class="w-full md:w-30rem">
                <ng-template let-node pTemplate="url">
                    <a [href]="node.data" target="_blank" rel="noopener noreferrer" class="text-700 hover:text-primary">{{ node.label }}</a>
                </ng-template>
                <ng-template let-node pTemplate="default">
                    <b>{{ node.label }}</b>
                </ng-template>
            </p-tree>
        </div>
        <app-code [code]="code" selector="tree-template-demo"></app-code>
    </section>`
})
export class TemplateDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    nodes!: TreeNode[];

    ngOnInit() {
        this.nodes = [
            {
                key: '0',
                label: 'Introduction',
                children: [
                    { key: '0-0', label: 'What is Angular', data: 'https://angular.io', type: 'url' },
                    { key: '0-1', label: 'Getting Started', data: 'https://angular.io/guide/setup-local', type: 'url' },
                    { key: '0-2', label: 'Learn and Explore', data: 'https://angular.io/guide/architecture', type: 'url' },
                    { key: '0-3', label: 'Take a Look', data: 'https://angular.io/start', type: 'url' }
                ]
            },
            {
                key: '1',
                label: 'Components In-Depth',
                children: [
                    { key: '1-0', label: 'Component Registration', data: 'https://angular.io/guide/component-interaction', type: 'url' },
                    { key: '1-1', label: 'User Input', data: 'https://angular.io/guide/user-input', type: 'url' },
                    { key: '1-2', label: 'Hooks', data: 'https://angular.io/guide/lifecycle-hooks', type: 'url' },
                    { key: '1-3', label: 'Attribute Directives', data: 'https://angular.io/guide/attribute-directives', type: 'url' }
                ]
            }
        ];
    }

    code: Code = {
        basic: `
<p-tree [value]="nodes" class="w-full md:w-30rem">
    <ng-template let-node pTemplate="url">
         <a [href]="node.data" target="_blank" rel="noopener noreferrer" class="text-700 hover:text-primary">{{ node.label }}</a>
    </ng-template>
    <ng-template let-node pTemplate="default">
        <b>{{ node.label }}</b>
    </ng-template>
</p-tree>`,

        html: `
<div class="card flex justify-content-center">
    <p-tree [value]="nodes" class="w-full md:w-30rem">
        <ng-template let-node pTemplate="url">
             <a [href]="node.data" target="_blank" rel="noopener noreferrer" class="text-700 hover:text-primary">{{ node.label }}</a>
        </ng-template>
        <ng-template let-node pTemplate="default">
            <b>{{ node.label }}</b>
        </ng-template>
    </p-tree>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'tree-template-demo',
    templateUrl: './tree-template-demo.html'
})
export class TreeTemplateDemo implements OnInit {
    nodes!: TreeNode[];

    ngOnInit() {
        this.nodes = [
            {
                key: '0',
                label: 'Introduction',
                children: [
                    { key: '0-0', label: 'What is Angular', data: 'https://angular.io', type: 'url' },
                    { key: '0-1', label: 'Getting Started', data: 'https://angular.io/guide/setup-local', type: 'url' },
                    { key: '0-2', label: 'Learn and Explore', data: 'https://angular.io/guide/architecture', type: 'url' },
                    { key: '0-3', label: 'Take a Look', data: 'https://angular.io/start', type: 'url' }
                ]
            },
            {
                key: '1',
                label: 'Components In-Depth',
                children: [
                    { key: '1-0', label: 'Component Registration', data: 'https://angular.io/guide/component-interaction', type: 'url' },
                    { key: '1-1', label: 'User Input', data: 'https://angular.io/guide/user-input', type: 'url' },
                    { key: '1-2', label: 'Hooks', data: 'https://angular.io/guide/lifecycle-hooks', type: 'url' },
                    { key: '1-3', label: 'Attribute Directives', data: 'https://angular.io/guide/attribute-directives', type: 'url' }
                ]
            }
        ];
    }
}`
    };
}
