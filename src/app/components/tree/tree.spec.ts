import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tree, UITreeNode } from './tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContextMenu, ContextMenuSub } from 'primeng/contextmenu';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, ElementRef, ViewChild, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextMenuService, TreeDragDropService } from 'primeng/api';

@Component({
    template: `
        <p-tree></p-tree>
        <p-contextMenu #cm [model]="item"></p-contextMenu>
        <p-tree class="files" [value]="filesTree7" draggableNodes="true" droppableNodes="true" droppableScope="files" draggableScope="server2"></p-tree>
        <p-tree class="server1" [value]="filesTree8" draggableNodes="true" droppableNodes="true" droppableScope="server1" draggableScope="files"></p-tree>
        <p-tree class="server2" [value]="filesTree9" draggableNodes="true" droppableNodes="true" droppableScope="server2" draggableScope="server1"></p-tree>
    `
})
class TestTreeComponent implements OnInit {
    @ViewChild('cm') cm: ElementRef;

    filesTree7: any;

    filesTree8: any;

    filesTree9: any;

    items: any;
    ngOnInit() {
        this.filesTree7 = [
            {
                label: 'Documents',
                data: 'Documents Folder',
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder',
                children: [
                    {
                        label: 'Work',
                        data: 'Work Folder',
                        expandedIcon: 'pi pi-folder-open',
                        collapsedIcon: 'pi pi-folder',
                        children: [
                            { label: 'Expenses.doc', icon: 'pi pi-file-word-o', data: 'Expenses Document' },
                            { label: 'Resume.doc', icon: 'pi pi-file-word-o', data: 'Resume Document' }
                        ]
                    },
                    {
                        label: 'Home',
                        data: 'Home Folder',
                        expandedIcon: 'pi pi-folder-open',
                        collapsedIcon: 'pi pi-folder',
                        children: [{ label: 'Invoices.txt', icon: 'pi pi-file-word-o', data: 'Invoices for this month' }]
                    }
                ]
            },
            {
                label: 'Pictures',
                data: 'Pictures Folder',
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder',
                children: [
                    { label: 'barcelona.jpg', icon: 'pi pi-file-image-o', data: 'Barcelona Photo' },
                    { label: 'logo.jpg', icon: 'pi pi-file-image-o', data: 'PrimeFaces Logo' },
                    { label: 'primeui.png', icon: 'pi pi-file-image-o', data: 'PrimeUI Logo' }
                ]
            },
            {
                label: 'Movies',
                data: 'Movies Folder',
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder',
                children: [
                    {
                        label: 'Al Pacino',
                        data: 'Pacino Movies',
                        children: [
                            { label: 'Scarface', icon: 'pi pi-file-video-o', data: 'Scarface Movie' },
                            { label: 'Serpico', icon: 'pi pi-file-video-o', data: 'Serpico Movie' }
                        ]
                    },
                    {
                        label: 'Robert De Niro',
                        data: 'De Niro Movies',
                        children: [
                            { label: 'Goodfellas', icon: 'pi pi-file-video-o', data: 'Goodfellas Movie' },
                            { label: 'Untouchables', icon: 'pi pi-file-video-o', data: 'Untouchables Movie' }
                        ]
                    }
                ]
            }
        ];

        this.filesTree8 = [
            {
                label: 'Backup',
                data: 'Backup Folder',
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder'
            }
        ];

        this.filesTree9 = [
            {
                label: 'Storage',
                data: 'Storage Folder',
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder'
            }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search' },
            { label: 'Unselect', icon: 'pi pi-close' }
        ];
    }
}

describe('Tree', () => {
    let tree: Tree;
    let filesTree: Tree;
    let server1Tree: Tree;
    let server2Tree: Tree;
    let contextMenu: ContextMenu;
    let testComponent: TestTreeComponent;
    let fixture: ComponentFixture<TestTreeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterTestingModule.withRoutes([{ path: 'test', component: ContextMenu }])],
            declarations: [Tree, UITreeNode, ContextMenu, ContextMenuSub, TestTreeComponent],
            providers: [TreeDragDropService, ContextMenuService],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(TestTreeComponent);
        tree = fixture.debugElement.children[0].componentInstance;
        filesTree = fixture.debugElement.children[2].componentInstance;
        server1Tree = fixture.debugElement.children[3].componentInstance;
        server2Tree = fixture.debugElement.children[4].componentInstance;
        testComponent = fixture.componentInstance;
        contextMenu = fixture.debugElement.children[1].componentInstance;
        tree.value = [
            {
                label: 'Documents',
                data: 'Documents Folder',
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder',
                children: [
                    {
                        label: 'Work',
                        data: 'Work Folder',
                        expandedIcon: 'pi pi-folder-open',
                        collapsedIcon: 'pi pi-folder',
                        children: [
                            { label: 'Expenses.doc', icon: 'pi pi-file-word-o', data: 'Expenses Document' },
                            { label: 'Resume.doc', icon: 'pi pi-file-word-o', data: 'Resume Document' }
                        ]
                    },
                    {
                        label: 'Home',
                        data: 'Home Folder',
                        expandedIcon: 'pi pi-folder-open',
                        collapsedIcon: 'pi pi-folder',
                        children: [{ label: 'Invoices.txt', icon: 'pi pi-file-word-o', data: 'Invoices for this month' }]
                    }
                ]
            },
            {
                label: 'Pictures',
                data: 'Pictures Folder',
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder',
                children: [
                    { label: 'barcelona.jpg', icon: 'pi pi-file-image-o', data: 'Barcelona Photo' },
                    { label: 'logo.jpg', icon: 'pi pi-file-image-o', data: 'PrimeFaces Logo' },
                    { label: 'primeui.png', icon: 'pi pi-file-image-o', data: 'PrimeUI Logo' }
                ]
            },
            {
                label: 'Movies',
                data: 'Movies Folder',
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder',
                children: [
                    {
                        label: 'Al Pacino',
                        data: 'Pacino Movies',
                        children: [
                            { label: 'Scarface', icon: 'pi pi-file-video-o', data: 'Scarface Movie' },
                            { label: 'Serpico', icon: 'pi pi-file-video-o', data: 'Serpico Movie' }
                        ]
                    },
                    {
                        label: 'Robert De Niro',
                        data: 'De Niro Movies',
                        children: [
                            { label: 'Goodfellas', icon: 'pi pi-file-video-o', data: 'Goodfellas Movie' },
                            { label: 'Untouchables', icon: 'pi pi-file-video-o', data: 'Untouchables Movie' }
                        ]
                    }
                ]
            }
        ];
    });

    it('should created', () => {
        fixture.detectChanges();

        const treeEl = fixture.debugElement.query(By.css('.p-tree'));
        expect(treeEl.nativeElement).toBeTruthy();
    });

    it('should call toggle and expand clicked row', () => {
        fixture.detectChanges();

        const toggleEls = fixture.debugElement.queryAll(By.css('.p-tree-toggler'));
        const documentsToggleEl = toggleEls[0];
        const treeNodes = fixture.debugElement.queryAll(By.css('p-treeNode'));
        const documentsNode = treeNodes[0].componentInstance as UITreeNode;
        const expandSpy = spyOn(documentsNode, 'expand').and.callThrough();
        expect(documentsNode.node.expanded).toBeUndefined();
        documentsToggleEl.nativeElement.click();
        fixture.detectChanges();

        expect(documentsNode.node.expanded).toBeTruthy();
        expect(expandSpy).toHaveBeenCalled();
    });

    it('should call toggle and collapse clicked row', () => {
        fixture.detectChanges();

        const toggleEls = fixture.debugElement.queryAll(By.css('.p-tree-toggler'));
        const documentsToggleEl = toggleEls[0];
        const treeNodes = fixture.debugElement.queryAll(By.css('p-treeNode'));
        const documentsNode = treeNodes[0].componentInstance as UITreeNode;
        const collapseSpy = spyOn(documentsNode, 'collapse').and.callThrough();
        expect(documentsNode.node.expanded).toBeUndefined();
        documentsToggleEl.nativeElement.click();
        fixture.detectChanges();

        documentsToggleEl.nativeElement.click();
        fixture.detectChanges();

        expect(documentsNode.node.expanded).toBeFalsy();
        expect(collapseSpy).toHaveBeenCalled();
    });

    it('should expand&collapse with right and left key', () => {
        fixture.detectChanges();

        const contentEls = fixture.debugElement.queryAll(By.css('.p-treenode'));
        const treeNodes = fixture.debugElement.queryAll(By.css('p-treeNode'));
        const documentsNode = treeNodes[0].componentInstance as UITreeNode;
        const onKeyDownSpy = spyOn(documentsNode, 'onKeyDown').and.callThrough();

        const firstEl = contentEls[0];
        firstEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
        fixture.detectChanges();

        expect(onKeyDownSpy).toHaveBeenCalled();
        expect(documentsNode.node.expanded).toBeTruthy();
        firstEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
        fixture.detectChanges();

        expect(documentsNode.node.expanded).toBeFalsy();
        firstEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        fixture.detectChanges();

        expect(documentsNode.node.expanded).toBeFalsy();
        firstEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        fixture.detectChanges();

        expect(documentsNode.node.expanded).toBeFalsy();
    });

    it('should be filtered', () => {
        tree.filter = true;
        fixture.detectChanges();

        const filterInput = fixture.debugElement.query(By.css('.p-tree-filter'));
        expect(filterInput).toBeTruthy();
        filterInput.triggerEventHandler('input', { target: { value: 'd' } });
        fixture.detectChanges();

        expect(tree.filteredNodes).toBeTruthy();
        expect(tree.filteredNodes.length).toEqual(2);
    });
});
