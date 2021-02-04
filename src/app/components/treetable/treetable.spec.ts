import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TreeTable, TreeTableModule, TTScrollableView } from './treetable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { ContextMenuModule, ContextMenu } from 'primeng/contextmenu';

@Component({
    template: `
        <p-treeTable class="basicTreeTable" [value]="files" [columns]="cols">
            <ng-template pTemplate="caption">
                FileSystem
            </ng-template>
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr [ttRow]="rowNode">
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="footer" let-columns>
                <tr>
                    <td *ngFor="let col of columns">
                        {{col.header}}
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="summary">
                Summary
            </ng-template>
        </p-treeTable>
        <p-treeTable class="paginationTreeTable" [value]="files" [columns]="cols" [paginator]="true" [rows]="3">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>
            </ng-template>
        </p-treeTable>
        <p-treeTable class="basicSortTreeTable" [value]="files" [columns]="cols">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                        {{col.header}}
                        <p-treeTableSortIcon [field]="col.field"></p-treeTableSortIcon>
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>
            </ng-template>
        </p-treeTable>
        <p-treeTable class="multipleSortTreeTable" [value]="files" [columns]="cols" sortMode="multiple">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                        {{col.header}}
                        <p-treeTableSortIcon [field]="col.field"></p-treeTableSortIcon>
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>            
            </ng-template>
        </p-treeTable>
        <p-treeTable class="singleSelectionTreeTable" [value]="files" [columns]="cols" selectionMode="single" [(selection)]="selectedNode" dataKey="name">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>
            </ng-template>
        </p-treeTable>
        <p-treeTable class="multipleSelectionTreeTable" [value]="files" [columns]="cols" selectionMode="multiple" [(selection)]="selectedNode" dataKey="name">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>
            </ng-template>
        </p-treeTable>
        <p-treeTable class="checkboxSelectionTreeTable" [value]="files" [columns]="cols" selectionMode="checkbox" [(selection)]="selectedNode">
            <ng-template pTemplate="caption">
                <div style="text-align:left">
                    <p-treeTableHeaderCheckbox></p-treeTableHeaderCheckbox>
                    <span style="margin-left: .25em; vertical-align: middle">Toggle All</span>
                </div>
            </ng-template>
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        <p-treeTableCheckbox [value]="rowNode" *ngIf="i == 0"></p-treeTableCheckbox>
                        {{rowData[col.field]}}
                    </td>
                </tr>
            </ng-template>
        </p-treeTable>
        <p-treeTable class="editableTreeTable" [value]="files" [columns]="cols">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns; let i = index" ttEditableColumn [ngClass]="{'p-toggler-column': i === 0}">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                        <p-treeTableCellEditor>
                            <ng-template pTemplate="input">
                                <input pInputText type="text" [(ngModel)]="rowData[col.field]" [ngStyle]="{'width': i == 0 ? '90%': '100%'}">
                            </ng-template>
                            <ng-template pTemplate="output">{{rowData[col.field]}}</ng-template>
                        </p-treeTableCellEditor>
                    </td>
                </tr>            
            </ng-template>
        </p-treeTable>
        <p-treeTable class="basicScrollTable" [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="200px">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>            
            </ng-template>
        </p-treeTable>
        <p-treeTable class="resizableTreeTable" [value]="files" [columns]="cols" [resizableColumns]="true">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns" ttResizableColumn>
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>            
            </ng-template>
        </p-treeTable>
        <p-treeTable class="reorderableTreeTable" [value]="files" [columns]="cols" [reorderableColumns]="true">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns" ttReorderableColumn>
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>            
            </ng-template>
        </p-treeTable>
        <p-treeTable class="contextMenuTreeTable" [value]="files" [columns]="cols" dataKey="name" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr [ttContextMenuRow]="rowNode">
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>
            </ng-template>
        </p-treeTable>

        <p-contextMenu #cm [model]="items"></p-contextMenu>

        <p-treeTable class="filterTreeTable" #tt [value]="files" [columns]="cols">
            <ng-template pTemplate="caption">
                <div style="text-align: right">        
                    <i class="pi pi-search" style="margin:4px 4px 0 0"></i>
                    <input type="text" pInputText size="50" class="globalFilter" placeholder="Global Filter" (input)="tt.filterGlobal($event.target.value, 'contains')" style="width:auto">
                </div>
            </ng-template>
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of cols">
                        {{col.header}}
                    </th>
                </tr>
                <tr>
                    <th *ngFor="let col of cols">
                        <input pInputText type="text" class="filterInput" (input)="tt.filter($event.target.value, col.field, filterMode)">
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                <tr>
                    <td *ngFor="let col of cols; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col.field]}}
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>        
                    <td [attr.colspan]="cols.length">No data found.</td>
                </tr>
            </ng-template>
        </p-treeTable>
`
})
class TestTreeTableComponent {

    ngOnInit() {
        this.totalRecords = 250000;

        this.showLoader = false;
    }
    selectedNode:any;
    filterMode = "contains";
    cols = [
        { field: 'name', header: 'Name' },
        { field: 'size', header: 'Size' },
        { field: 'type', header: 'Type' }
    ];
    items = [
        { label: 'View', icon: 'pi pi-search', command: (event) => {} },
        { label: 'Toggle', icon: 'pi pi-sort', command: (event) => {} }
    ];

    loadNodes(event) {
        setTimeout(() => {
            this.virtualFiles = [];

            if (event.first === 249980)
                this.createLazyNodes(event.first, 20);
            else
                this.createLazyNodes(event.first, event.rows);
        }, 50);
    }

    createLazyNodes(index, length) {
        for(let i = 0; i < length; i++) {
            let node = {
                data: {  
                    name: 'Item ' + (index + i),
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + (index + i)
                },
                leaf: false
            };

            this.virtualFiles.push(node);
        }
    }
    onNodeExpand(event) {
    }
    totalRecords: number;
    virtualFiles: any[];
    showLoader: boolean;
    files = [  
        {  
            "data":{  
                "name":"Applications",
                "size":"200mb",
                "type":"Folder"
            },
            "children":[  
                {  
                    "data":{  
                        "name":"Angular",
                        "size":"25mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"angular.app",
                                "size":"10mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"cli.app",
                                "size":"10mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"mobile.app",
                                "size":"5mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":"editor.app",
                        "size":"25mb",
                        "type":"Application"
                    }
                },
                {  
                    "data":{  
                        "name":"settings.app",
                        "size":"50mb",
                        "type":"Application"
                    }
                }
            ]
        },
        {  
            "data":{  
                "name":"Cloud",
                "size":"20mb",
                "type":"Folder"
            },
            "children":[  
                {  
                    "data":{  
                        "name":"backup-1.zip",
                        "size":"10mb",
                        "type":"Zip"
                    }
                },
                {  
                    "data":{  
                        "name":"backup-2.zip",
                        "size":"10mb",
                        "type":"Zip"
                    }
                }
            ]
        },
        {  
            "data": {  
                "name":"Desktop",
                "size":"150kb",
                "type":"Folder"
            },
            "children":[  
                {  
                    "data":{  
                        "name":"note-meeting.txt",
                        "size":"50kb",
                        "type":"Text"
                    }
                },
                {  
                    "data":{  
                        "name":"note-todo.txt",
                        "size":"100kb",
                        "type":"Text"
                    }
                }
            ]
        },
        {  
            "data":{  
                "name":"Documents",
                "size":"75kb",
                "type":"Folder"
            },
            "children":[
                {  
                    "data":{  
                        "name":"Work",
                        "size":"55kb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Expenses.doc",
                                "size":"30kb",
                                "type":"Document"
                            }
                        },
                        {  
                            "data":{  
                                "name":"Resume.doc",
                                "size":"25kb",
                                "type":"Resume"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":"Home",
                        "size":"20kb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Invoices",
                                "size":"20kb",
                                "type":"Text"
                            }
                        }
                    ]
                }
            ]
        },
        {  
            "data": {  
                "name":"Downloads",
                "size":"25mb",
                "type":"Folder"
            },
            "children":[  
                {  
                    "data": {  
                        "name":"Spanish",
                        "size":"10mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"tutorial-a1.txt",
                                "size":"5mb",
                                "type":"Text"
                            }
                        },
                        {  
                            "data":{  
                                "name":"tutorial-a2.txt",
                                "size":"5mb",
                                "type":"Text"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":"Travel",
                        "size":"15mb",
                        "type":"Text"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Hotel.pdf",
                                "size":"10mb",
                                "type":"PDF"
                            }
                        },
                        {  
                            "data":{  
                                "name":"Flight.pdf",
                                "size":"5mb",
                                "type":"PDF"
                            }
                        }
                    ]
                }
            ]
        },
        {  
            "data": {  
                "name":"Main",
                "size":"50mb",
                "type":"Folder"
            },
            "children":[  
                {  
                    "data":{  
                        "name":"bin",
                        "size":"50kb",
                        "type":"Link"
                    }
                },
                {  
                    "data":{  
                        "name":"etc",
                        "size":"100kb",
                        "type":"Link"
                    }
                },
                {  
                    "data":{  
                        "name":"var",
                        "size":"100kb",
                        "type":"Link"
                    }
                }
            ]
        },
        {  
            "data":{  
                "name":"Other",
                "size":"5mb",
                "type":"Folder"
            },
            "children":[  
                {  
                    "data":{  
                        "name":"todo.txt",
                        "size":"3mb",
                        "type":"Text"
                    }
                },
                {  
                    "data":{  
                        "name":"logo.png",
                        "size":"2mb",
                        "type":"Picture"
                    }
                }
            ]
        },
        {  
            "data":{  
                "name":"Pictures",
                "size":"150kb",
                "type":"Folder"
            },
            "children":[  
                {  
                    "data":{  
                        "name":"barcelona.jpg",
                        "size":"90kb",
                        "type":"Picture"
                    }
                },
                {  
                    "data":{  
                        "name":"primeng.png",
                        "size":"30kb",
                        "type":"Picture"
                    }
                },
                {  
                    "data":{  
                        "name":"prime.jpg",
                        "size":"30kb",
                        "type":"Picture"
                    }
                }
            ]
        },
        {  
            "data":{  
                "name":"Videos",
                "size":"1500mb",
                "type":"Folder"
            },
            "children":[  
                {  
                    "data":{  
                        "name":"primefaces.mkv",
                        "size":"1000mb",
                        "type":"Video"
                    }
                },
                {  
                    "data":{  
                        "name":"intro.avi",
                        "size":"500mb",
                        "type":"Video"
                    }
                }
            ]
        }
    ];
}

describe('TreeTable', () => {

    let testcomponent:TestTreeTableComponent;
    let basicTreetable: TreeTable;
    let paginationTreeTable: TreeTable;
    let basicSortTreeTable: TreeTable;
    let multipleSortTreeTable: TreeTable;
    let singleSelectionTreeTable: TreeTable;
    let multipleSelectionTreeTable: TreeTable;
    let checkboxSelectionTreeTable: TreeTable;
    let editableTreeTable: TreeTable;
    let basicScrollTable: TreeTable;
    let resizableTreeTable: TreeTable;
    let reorderableTreeTable: TreeTable;
    let contextMenuTreeTable: TreeTable;
    let filterTreeTable: TreeTable;
    let fixture: ComponentFixture<TestTreeTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule,
                ScrollingModule,
                TreeTableModule,
                ContextMenuModule
            ],
            declarations: [
                TestTreeTableComponent
            ]
        });

        fixture = TestBed.createComponent(TestTreeTableComponent);
        testcomponent = fixture.componentInstance;
        basicTreetable = fixture.debugElement.children[0].componentInstance;
        paginationTreeTable = fixture.debugElement.children[1].componentInstance;
        basicSortTreeTable = fixture.debugElement.children[2].componentInstance;
        multipleSortTreeTable = fixture.debugElement.children[3].componentInstance;
        singleSelectionTreeTable = fixture.debugElement.children[4].componentInstance;
        multipleSelectionTreeTable = fixture.debugElement.children[5].componentInstance;
        checkboxSelectionTreeTable = fixture.debugElement.children[6].componentInstance;
        editableTreeTable = fixture.debugElement.children[7].componentInstance;
        basicScrollTable = fixture.debugElement.children[8].componentInstance;resizableTreeTable
        resizableTreeTable = fixture.debugElement.children[9].componentInstance;
        reorderableTreeTable = fixture.debugElement.children[10].componentInstance;
        contextMenuTreeTable = fixture.debugElement.children[11].componentInstance;
        filterTreeTable = fixture.debugElement.children[13].componentInstance;
    });

    it('should show 11 rows', () => {
        fixture.detectChanges();
  
        const basicTreeTableEl = fixture.debugElement.query(By.css(".basicTreeTable"));
        const rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        const toggleEls = basicTreeTableEl.queryAll(By.css("p-treeTableToggler"));
        expect(rowEls.length).toEqual(11);
        expect(toggleEls.length).toEqual(9);
    });

    it('should expand first row', () => {
        fixture.detectChanges();
  
        const basicTreeTableEl = fixture.debugElement.query(By.css(".basicTreeTable"));
        let rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls.length).toEqual(11);
        const toggleEls = basicTreeTableEl.queryAll(By.css(".p-treetable-toggler"));
        const firstToggleComp = toggleEls[0].componentInstance;
        const onClickSpy = spyOn(firstToggleComp,"onClick").and.callThrough();
        toggleEls[0].nativeElement.click();
        fixture.detectChanges();

        rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(onClickSpy).toHaveBeenCalled();
        expect(rowEls.length).toEqual(14);
    });

    it('should expand and collapse first row', () => {
        fixture.detectChanges();
  
        const basicTreeTableEl = fixture.debugElement.query(By.css(".basicTreeTable"));
        let rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls.length).toEqual(11 );
        let toggleEls = basicTreeTableEl.queryAll(By.css(".p-treetable-toggler"));
        const firstToggleComp = toggleEls[0].componentInstance;
        const onClickSpy = spyOn(firstToggleComp,"onClick").and.callThrough();
        toggleEls[0].nativeElement.click();
        fixture.detectChanges();

        rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls.length).toEqual(14);
        toggleEls = basicTreeTableEl.queryAll(By.css(".p-treetable-toggler"));
        toggleEls[0].nativeElement.click();
        fixture.detectChanges();

        rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls.length).toEqual(11);
    });

    it('should focus next row', () => {
        fixture.detectChanges();
  
        const basicTreeTableEl = fixture.debugElement.query(By.css(".basicTreeTable"));
        let rowEls = basicTreeTableEl.queryAll(By.css("tr"));
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
		keydownEvent.initEvent('keydown', true, true);
        rowEls[2].nativeElement.dispatchEvent(keydownEvent);

        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls[3].nativeElement).toEqual(document.activeElement);
    });

    it('should focus previous row', () => {
        fixture.detectChanges();
  
        const basicTreeTableEl = fixture.debugElement.query(By.css(".basicTreeTable"));
        let rowEls = basicTreeTableEl.queryAll(By.css("tr"));
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 38;
		keydownEvent.initEvent('keydown', true, true);
        rowEls[3].nativeElement.dispatchEvent(keydownEvent);

        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls[2].nativeElement).toEqual(document.activeElement);
    });

    it('should expand and collapse row with nav keys', () => {
        fixture.detectChanges();
  
        const basicTreeTableEl = fixture.debugElement.query(By.css(".basicTreeTable"));
        let rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls.length).toEqual(11);
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 39;
		keydownEvent.initEvent('keydown', true, true);
        rowEls[0].nativeElement.dispatchEvent(keydownEvent);

        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls.length).toEqual(11);
        keydownEvent.which = 37;
        rowEls[0].nativeElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();

        rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls.length).toEqual(11);
    });

    it('should create sections (caption footer summary)', () => {
        fixture.detectChanges();
  
        const basicTreeTableEl = fixture.debugElement.query(By.css(".basicTreeTable"));
        const captionEl = basicTreeTableEl.query(By.css(".p-treetable-header"));
        const summaryEl = basicTreeTableEl.query(By.css(".p-treetable-footer"));
        const footerEl = basicTreeTableEl.query(By.css(".p-treetable-tfoot"));
        expect(captionEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(footerEl).toBeTruthy();
    });
    
    it('should create paginator and 4 rows', () => {
        fixture.detectChanges();
  
        const paginationTreeTableEl = fixture.debugElement.query(By.css(".paginationTreeTable"));
        let rowEls = paginationTreeTableEl.queryAll(By.css("tr"));
        const paginatorEl = paginationTreeTableEl.query(By.css("p-paginator"));
        const pages = paginationTreeTableEl.queryAll(By.css(".p-paginator-page"));

        expect(rowEls.length).toEqual(4);
        expect(paginatorEl).toBeTruthy();
        expect(pages.length).toEqual(3);
    });

    it('should change page', () => {
        fixture.detectChanges();
  
        const paginationTreeTableEl = fixture.debugElement.query(By.css(".paginationTreeTable"));
        const pages = paginationTreeTableEl.queryAll(By.css(".p-paginator-page"));
        expect(paginationTreeTable.first).toEqual(0);
        const onPageChangeSpy = spyOn(paginationTreeTable,"onPageChange").and.callThrough();
        pages[1].nativeElement.click();
        fixture.detectChanges();

        expect(onPageChangeSpy).toHaveBeenCalled();
        expect(paginationTreeTable.first).toEqual(3);
    });

    it('should sort the treetable', () => {
        fixture.detectChanges();
  
        const sortSpy = spyOn(basicSortTreeTable,"sort").and.callThrough();
        const sortSingleSpy = spyOn(basicSortTreeTable,"sortSingle").and.callThrough();
        const basicSortTreeTableEl = fixture.debugElement.query(By.css(".basicSortTreeTable"));
        const sortableHeaders = basicSortTreeTableEl.queryAll(By.css("th"));
        let rowEls = basicSortTreeTableEl.queryAll(By.css("td"));
        expect(rowEls[0].nativeElement.textContent).toContain("Applications");
        expect(sortableHeaders.length).toEqual(3);
        sortableHeaders[0].nativeElement.click();
        fixture.detectChanges();

        sortableHeaders[0].nativeElement.click();
        fixture.detectChanges();

        rowEls = basicSortTreeTableEl.queryAll(By.css("td"));
        expect(sortSpy).toHaveBeenCalled();
        expect(sortSingleSpy).toHaveBeenCalled();
        expect(rowEls[0].nativeElement.textContent).toContain("Videos");
    });

    it('should sort the treetable (multiple)', () => {
        fixture.detectChanges();
  
        const sortMultipleSpy = spyOn(multipleSortTreeTable,"sortMultiple").and.callThrough();
        const multipleSortTreeTableEl = fixture.debugElement.query(By.css(".multipleSortTreeTable"));
        const sortableHeaders = multipleSortTreeTableEl.queryAll(By.css("th"));
        let rowEls = multipleSortTreeTableEl.queryAll(By.css("td"));
        expect(rowEls[0].nativeElement.textContent).toContain("Applications");
        expect(sortableHeaders.length).toEqual(3);
        sortableHeaders[2].nativeElement.click();
        fixture.detectChanges();

        const clickEvent: any = document.createEvent('CustomEvent');
		clickEvent.initEvent('click', true, true);
		clickEvent.ctrlKey = true;
        sortableHeaders[1].nativeElement.dispatchEvent(clickEvent);
        fixture.detectChanges();

        rowEls = multipleSortTreeTableEl.queryAll(By.css("td"));
        expect(sortMultipleSpy).toHaveBeenCalled();
        expect(rowEls[0].nativeElement.textContent).toContain("Other");
    });

    it('should single select', () => {
        fixture.detectChanges();
  
        const handleRowClickSpy = spyOn(singleSelectionTreeTable,"handleRowClick").and.callThrough();
        const singleSelectionTreeTableEl = fixture.debugElement.query(By.css(".singleSelectionTreeTable"));
        let rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        rowEls[1].nativeElement.click();
        fixture.detectChanges();

        expect(handleRowClickSpy).toHaveBeenCalled();
        expect(testcomponent.selectedNode.data.name).toEqual("Applications");
        rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.initEvent('keydown', true, true);
        keydownEvent.code ="Enter";
        keydownEvent.key = "Enter";
        keydownEvent.keyCode = 13;
        keydownEvent.which = 13;
        rowEls[2].nativeElement.dispatchEvent(keydownEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(testcomponent.selectedNode.data.name).toEqual("Cloud");
        rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        const touchendEvent: any = document.createEvent('CustomEvent');
        touchendEvent.initEvent('touchend', true, true);
        rowEls[2].nativeElement.dispatchEvent(touchendEvent);
        rowEls[2].nativeElement.dispatchEvent(keydownEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(testcomponent.selectedNode).toBeNull();
    });

    it('should single select with metaKeySelection', () => {
        fixture.detectChanges();
  
        singleSelectionTreeTable.metaKeySelection = true;
        fixture.detectChanges();

        const handleRowClickSpy = spyOn(singleSelectionTreeTable,"handleRowClick").and.callThrough();
        const singleSelectionTreeTableEl = fixture.debugElement.query(By.css(".singleSelectionTreeTable"));
        let rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        rowEls[1].nativeElement.click();
        fixture.detectChanges();

        expect(handleRowClickSpy).toHaveBeenCalled();
        expect(testcomponent.selectedNode.data.name).toEqual("Applications");
        rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        rowEls[2].nativeElement.click();
        fixture.detectChanges();

        expect(testcomponent.selectedNode.data.name).toEqual("Cloud");
        rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        
        rowEls[2].nativeElement.click();
        fixture.detectChanges();

        expect(testcomponent.selectedNode).not.toBeNull();
        const clickEvent: any = document.createEvent('CustomEvent');
        clickEvent.initEvent('click', true, true);
        clickEvent.ctrlKey = true;
        clickEvent.metaKey = true;
        rowEls[2].nativeElement.dispatchEvent(clickEvent);
        fixture.detectChanges();

        expect(testcomponent.selectedNode).toBeNull();
    });

    it('should multiple select', () => {
        fixture.detectChanges();
  
        const handleRowClickSpy = spyOn(multipleSelectionTreeTable,"handleRowClick").and.callThrough();
        const singleSelectionTreeTableEl = fixture.debugElement.query(By.css(".multipleSelectionTreeTable"));
        let rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        rowEls[1].nativeElement.click();
        fixture.detectChanges();

        expect(handleRowClickSpy).toHaveBeenCalled();
        expect(testcomponent.selectedNode[0].data.name).toEqual("Applications");
        rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.initEvent('keydown', true, true);
        keydownEvent.code ="Enter";
        keydownEvent.key = "Enter";
        keydownEvent.keyCode = 13;
        keydownEvent.which = 13;
        rowEls[2].nativeElement.dispatchEvent(keydownEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(testcomponent.selectedNode[1].data.name).toEqual("Cloud");
        expect(testcomponent.selectedNode.length).toEqual(2);
        rowEls[2].nativeElement.dispatchEvent(keydownEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(testcomponent.selectedNode.length).toEqual(1);
    });

    it('should multiple select with metaKeySeleciton', () => {
        fixture.detectChanges();
  
        multipleSelectionTreeTable.metaKeySelection = true;
        fixture.detectChanges();

        const handleRowClickSpy = spyOn(multipleSelectionTreeTable,"handleRowClick").and.callThrough();
        const singleSelectionTreeTableEl = fixture.debugElement.query(By.css(".multipleSelectionTreeTable"));
        let rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        rowEls[1].nativeElement.click();
        fixture.detectChanges();

        expect(handleRowClickSpy).toHaveBeenCalled();
        expect(testcomponent.selectedNode[0].data.name).toEqual("Applications");
        rowEls = singleSelectionTreeTableEl.queryAll(By.css("tr"));
        const clickEvent: any = document.createEvent('CustomEvent');
        clickEvent.initEvent('click', true, true);
        clickEvent.ctrlKey = true;
        clickEvent.metaKey = true;
        rowEls[2].nativeElement.dispatchEvent(clickEvent);
        fixture.detectChanges();

        expect(testcomponent.selectedNode[1].data.name).toEqual("Cloud");
        expect(testcomponent.selectedNode.length).toEqual(2);
        rowEls[3].nativeElement.dispatchEvent(clickEvent);
        fixture.detectChanges();

        expect(testcomponent.selectedNode.length).toEqual(3);
        rowEls[3].nativeElement.dispatchEvent(clickEvent);
        fixture.detectChanges();

        expect(testcomponent.selectedNode.length).toEqual(2);
        rowEls[3].nativeElement.click();
        fixture.detectChanges();

        expect(testcomponent.selectedNode.length).toEqual(1);
    });

    it('should select with checkbox', () => {
        fixture.detectChanges();
  
        const checkboxSelectionTreeTableEl = fixture.debugElement.query(By.css(".checkboxSelectionTreeTable"));
        let checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        expect(checkboxEls.length).toEqual(10);
        checkboxEls[1].query(By.css("input")).nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        expect(checkboxEls[1].query(By.css(".p-checkbox-box")).nativeElement.className).toContain("p-focus");
        checkboxEls[1].query(By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(checkboxEls[1].query(By.css(".p-checkbox-box")).nativeElement.className).not.toContain("p-focus");
        checkboxEls[1].nativeElement.click();
        fixture.detectChanges();

        expect(testcomponent.selectedNode[0].data.name).toEqual("Applications");
        checkboxEls[1].nativeElement.click();
        fixture.detectChanges();

        expect(testcomponent.selectedNode).toEqual([]);
    });

    it('should select childs with checkbox', () => {
        fixture.detectChanges();
  
        const checkboxSelectionTreeTableEl = fixture.debugElement.query(By.css(".checkboxSelectionTreeTable"));
        let checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        let toggleEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-treetable-toggler"));
        toggleEls[0].nativeElement.click();
        fixture.detectChanges();

        checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        expect(checkboxEls.length).toEqual(13);
        checkboxEls[2].nativeElement.click();
        fixture.detectChanges();

        checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        expect(checkboxEls[1].query(By.css(".p-checkbox-icon")).nativeElement.className).toContain("pi-minus");
        checkboxEls[3].nativeElement.click();
        checkboxEls[4].nativeElement.click();
        fixture.detectChanges();

        checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        expect(checkboxEls[1].query(By.css(".p-checkbox-icon")).nativeElement.className).toContain("pi-check");
        expect(testcomponent.selectedNode.length).toEqual(7);
        checkboxEls[4].nativeElement.click();
        fixture.detectChanges();

        checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        expect(checkboxEls[1].query(By.css(".p-checkbox-icon")).nativeElement.className).toContain("pi-minus");
        expect(testcomponent.selectedNode.length).toEqual(5);
    });

    it('should select with headerCheckbox', () => {
        fixture.detectChanges();
  
        const checkboxSelectionTreeTableEl = fixture.debugElement.query(By.css(".checkboxSelectionTreeTable"));
        let checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        checkboxEls[0].query(By.css("input")).nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        checkboxEls = checkboxSelectionTreeTableEl.queryAll(By.css(".p-checkbox"));
        expect(checkboxEls[0].query(By.css(".p-checkbox-box")).nativeElement.className).toContain("p-focus");
        checkboxEls[0].query(By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(checkboxEls[0].query(By.css(".p-checkbox-box")).nativeElement.className).not.toContain("p-focus");
        checkboxEls[0].nativeElement.click();
        fixture.detectChanges();

        expect(testcomponent.selectedNode.length).toEqual(40);
        checkboxEls[0].nativeElement.click();
        fixture.detectChanges();

        expect(testcomponent.selectedNode.length).toEqual(0);
    });

    it('should open cell and close', () => {
        fixture.detectChanges();
        
        const editableTreeTableEl = fixture.debugElement.query(By.css(".editableTreeTable"));
        let editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        editableColumns[0].nativeElement.click();
        fixture.detectChanges();

        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        let inputEl = editableTreeTableEl.query(By.css("input"));
        expect(inputEl).toBeTruthy();
        expect(editableColumns[0].nativeElement.className).toContain("p-cell-editing");
        fixture.detectChanges();

        document.dispatchEvent(new Event("click"));
        fixture.detectChanges();

        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        inputEl = editableTreeTableEl.query(By.css("input"));
        expect(inputEl).toBeFalsy();
        expect(editableColumns[0].nativeElement.className).not.toContain("p-cell-editing");
    });

    it('should open cell and close with tab escape and enter key', () => {
        fixture.detectChanges();
        
        const editableTreeTableEl = fixture.debugElement.query(By.css(".editableTreeTable"));
        let editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        editableColumns[1].nativeElement.click();
        fixture.detectChanges();

        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        let inputEl = editableTreeTableEl.query(By.css("input"));
        expect(inputEl).toBeTruthy();
        expect(editableColumns[1].nativeElement.className).toContain("p-cell-editing");
        fixture.detectChanges();

        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        editableColumns[1].triggerEventHandler('keydown',{'target':editableColumns[1].nativeElement,'keyCode':9,preventDefault(){}});
        fixture.detectChanges();

        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        expect(editableColumns[1].nativeElement.className).not.toContain("p-cell-editing");
        expect(editableColumns[2].nativeElement.className).toContain("p-cell-editing");
        editableColumns[2].triggerEventHandler('keydown',{'target':editableColumns[2].nativeElement,'keyCode':9,preventDefault(){}});
        fixture.detectChanges();

        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        expect(editableColumns[2].nativeElement.className).not.toContain("p-cell-editing");
        expect(editableColumns[3].nativeElement.className).toContain("p-cell-editing");

        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        editableColumns[3].triggerEventHandler('keydown',{'target':editableColumns[3].nativeElement,'shiftKey':true,'keyCode':9,preventDefault(){}});
        fixture.detectChanges();

        expect(editableColumns[3].nativeElement.className).not.toContain("p-cell-editing");
        expect(editableColumns[2].nativeElement.className).toContain("p-cell-editing");
        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        editableColumns[2].triggerEventHandler('keydown',{'target':editableColumns[2].nativeElement,'shiftKey':true,'keyCode':9,preventDefault(){}});
        fixture.detectChanges();

        expect(editableColumns[1].nativeElement.className).toContain("p-cell-editing");
        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        editableColumns[1].triggerEventHandler('keydown',{'target':editableColumns[1].nativeElement,'shiftKey':true,'keyCode':27,preventDefault(){}});
        fixture.detectChanges();

        expect(editableColumns[1].nativeElement.className).not.toContain("p-cell-editing");
        editableColumns = editableTreeTableEl.queryAll(By.css("td"));
        editableColumns[1].nativeElement.click();
        fixture.detectChanges();

        expect(editableColumns[1].nativeElement.className).toContain("p-cell-editing");
        editableColumns[1].triggerEventHandler('keydown',{'target':editableColumns[1].nativeElement,'shiftKey':true,'keyCode':13,preventDefault(){}});
        fixture.detectChanges();

        expect(editableColumns[1].nativeElement.className).not.toContain("p-cell-editing");
    });

    it('should create scrollable body and view', () => {
        fixture.detectChanges();
        
        const basicScrollTableEl = fixture.debugElement.query(By.css(".basicScrollTable"));
        const scrollEl = basicScrollTableEl.query(By.css(".p-treetable-scrollable-body"));
        const scrollBody = basicScrollTableEl.query(By.css(".p-treetable-scrollable-view"));
        fixture.detectChanges();
        
        scrollBody.nativeElement.dispatchEvent(new Event("scroll"));
        fixture.detectChanges();

        expect(scrollEl).toBeTruthy();
        expect(scrollBody).toBeTruthy();
    });

    it('should resize (Fit Mode)',  () => {
        fixture.detectChanges();

        const resizableTreeTableEl = fixture.debugElement.query(By.css(".resizableTreeTable"));
        const onColumnResizeBeginSpy = spyOn(resizableTreeTable,"onColumnResizeBegin").and.callThrough();
        const onColumnResizeSpy = spyOn(resizableTreeTable,"onColumnResize").and.callThrough();
        const onColumnResizeEndSpy = spyOn(resizableTreeTable,"onColumnResizeEnd").and.callThrough();
        let headerEls = resizableTreeTableEl.queryAll(By.css("th"));
        let firstWidth = headerEls[0].nativeElement.clientWidth;
        let firstResizer = document.querySelector(".p-column-resizer");
        const event: any = document.createEvent('CustomEvent');
        event.pageX = firstWidth + 200;
		event.initEvent('mousedown', true, true);
        firstResizer.dispatchEvent(event);

        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        event.pageX = firstWidth + 150;
		event.initEvent('mousemove', true, true);
        firstResizer.dispatchEvent(event);
        fixture.detectChanges();

        expect(onColumnResizeSpy).toHaveBeenCalled();
        event.initEvent('mouseup', true, true);
        firstResizer.dispatchEvent(event);
        fixture.detectChanges();

        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        headerEls = resizableTreeTableEl.queryAll(By.css("th"));
        expect(headerEls[0].nativeElement.clientWidth).toBeLessThan(firstWidth);
        firstWidth = headerEls[0].nativeElement.clientWidth;
        event.pageX = firstWidth + 200;
		event.initEvent('mousedown', true, true);
        firstResizer.dispatchEvent(event);

        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        event.pageX = 0;
		event.initEvent('mousemove', true, true);
        firstResizer.dispatchEvent(event);
        fixture.detectChanges();

        expect(onColumnResizeSpy).toHaveBeenCalled();
        event.initEvent('mouseup', true, true);
        firstResizer.dispatchEvent(event);
        fixture.detectChanges();

        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        headerEls = resizableTreeTableEl.queryAll(By.css("th"));
        expect(headerEls[0].nativeElement.clientWidth).toEqual(firstWidth);
    });

    it('should resize (Expand Mode)',  () => {
        resizableTreeTable.columnResizeMode = "expand";
        fixture.detectChanges();

        const resizableTreeTableEl = fixture.debugElement.query(By.css(".resizableTreeTable"));
        const onColumnResizeBeginSpy = spyOn(resizableTreeTable,"onColumnResizeBegin").and.callThrough();
        const onColumnResizeSpy = spyOn(resizableTreeTable,"onColumnResize").and.callThrough();
        const onColumnResizeEndSpy = spyOn(resizableTreeTable,"onColumnResizeEnd").and.callThrough();
        let headerEls = resizableTreeTableEl.queryAll(By.css("th"));
        let firstWidth = headerEls[0].nativeElement.clientWidth;
        let firstResizer = document.querySelector(".p-column-resizer");
        const event: any = document.createEvent('CustomEvent');
        event.pageX = firstWidth + 200;
		event.initEvent('mousedown', true, true);
        firstResizer.dispatchEvent(event);

        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        event.pageX = firstWidth + 150;
		event.initEvent('mousemove', true, true);
        firstResizer.dispatchEvent(event);
        fixture.detectChanges();

        expect(onColumnResizeSpy).toHaveBeenCalled();
        event.initEvent('mouseup', true, true);
        firstResizer.dispatchEvent(event);
        fixture.detectChanges();

        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        headerEls = resizableTreeTableEl.queryAll(By.css("th"));
        expect(headerEls[0].nativeElement.clientWidth).toBeLessThan(firstWidth);
        firstWidth = headerEls[0].nativeElement.clientWidth;
        event.pageX = firstWidth + 200;
		event.initEvent('mousedown', true, true);
        firstResizer.dispatchEvent(event);

        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        event.pageX = 0;
		event.initEvent('mousemove', true, true);
        firstResizer.dispatchEvent(event);
        fixture.detectChanges();

        expect(onColumnResizeSpy).toHaveBeenCalled();
        event.initEvent('mouseup', true, true);
        firstResizer.dispatchEvent(event);
        fixture.detectChanges();

        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        headerEls = resizableTreeTableEl.queryAll(By.css("th"));
        expect(headerEls[0].nativeElement.clientWidth).toEqual(firstWidth);
    });

    it('should reorder -1',  () => {
        fixture.detectChanges();

        const reorderableTreeTableEl = fixture.debugElement.query(By.css(".reorderableTreeTable"));
        let reorableHeaderEls = reorderableTreeTableEl.queryAll(By.css("th"));
        expect(reorableHeaderEls[0].nativeElement.draggable).toBeFalsy();
        reorableHeaderEls[0].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();

        expect(reorableHeaderEls[0].nativeElement.draggable).toBeTruthy();
        const onColumnDragStartSpy = spyOn(reorderableTreeTable,"onColumnDragStart").and.callThrough();
        const dragEvent: any = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = {setData(val1,val2){}};
        reorableHeaderEls[0].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[1].nativeElement.clientWidth + 1;
        reorableHeaderEls[1].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        dragEvent.initEvent('dragleave', true, true);
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(onColumnDragStartSpy).toHaveBeenCalled();
        expect(reorderableTreeTable.draggedColumn.textContent).toEqual(" Name ");
        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[2].nativeElement.clientWidth * 2 + 1;
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(reorderableTreeTable.dropPosition).toEqual(-1);
        dragEvent.initEvent('drop');
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        reorableHeaderEls = reorderableTreeTableEl.queryAll(By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.textContent).toEqual(" Name ");
        expect(reorableHeaderEls[2].nativeElement.textContent).toEqual(" Type ");
    });

    it('should reorder +1',  () => {
        fixture.detectChanges();

        const reorderableTreeTableEl = fixture.debugElement.query(By.css(".reorderableTreeTable"));
        let reorableHeaderEls = reorderableTreeTableEl.queryAll(By.css("th"));
        expect(reorableHeaderEls[0].nativeElement.draggable).toBeFalsy();
        reorableHeaderEls[0].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();

        expect(reorableHeaderEls[0].nativeElement.draggable).toBeTruthy();
        const onColumnDragStartSpy = spyOn(reorderableTreeTable,"onColumnDragStart").and.callThrough();
        const dragEvent: any = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = {setData(val1,val2){}};
        reorableHeaderEls[0].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(onColumnDragStartSpy).toHaveBeenCalled();
        expect(reorderableTreeTable.draggedColumn.textContent).toEqual(" Name ");
        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[2].nativeElement.clientWidth * 3 + 1;
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(reorderableTreeTable.dropPosition).toEqual(1);
        dragEvent.initEvent('drop');
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        reorableHeaderEls = reorderableTreeTableEl.queryAll(By.css("th"));
        expect(reorableHeaderEls[0].nativeElement.textContent).toEqual(" Size ");
        expect(reorableHeaderEls[1].nativeElement.textContent).toEqual(" Type ");
        expect(reorableHeaderEls[2].nativeElement.textContent).toEqual(" Name ");
    });

    it('should open contextMenu (separate)',  () => {
        fixture.detectChanges();

        const contextMenu = fixture.debugElement.query(By.css(".p-contextmenu")).componentInstance as ContextMenu;
        const showSpy = spyOn(contextMenu,"show").and.callThrough();
        const contextMenuTableEl = fixture.debugElement.query(By.css(".contextMenuTreeTable"));
        const rowEls = contextMenuTableEl.queryAll(By.css("tr"));
        const event: any = document.createEvent('CustomEvent');
        const handleRowRightClickSpy = spyOn(contextMenuTreeTable,"handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
    
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTreeTable.contextMenuSelection.data.name).toEqual("Applications");
    });

    it('should select with contextMenu (joint single)',  () => {
        fixture.detectChanges();

        contextMenuTreeTable.selectionMode = "single";
        contextMenuTreeTable.contextMenuSelectionMode = "joint";
        fixture.detectChanges();

        const contextMenu = fixture.debugElement.query(By.css(".p-contextmenu")).componentInstance as ContextMenu;
        const showSpy = spyOn(contextMenu,"show").and.callThrough();
        const contextMenuTableEl = fixture.debugElement.query(By.css(".contextMenuTreeTable"));
        const rowEls = contextMenuTableEl.queryAll(By.css("tr"));
        const event: any = document.createEvent('CustomEvent');
        const handleRowRightClickSpy = spyOn(contextMenuTreeTable,"handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
    
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTreeTable.selection.data.name).toEqual("Applications");
    });

    it('should select with contextMenu (joint multiple)',  () => {
        fixture.detectChanges();

        contextMenuTreeTable.selectionMode = "multiple";
        contextMenuTreeTable.contextMenuSelectionMode = "joint";
        fixture.detectChanges();

        const contextMenu = fixture.debugElement.query(By.css(".p-contextmenu")).componentInstance as ContextMenu;
        const showSpy = spyOn(contextMenu,"show").and.callThrough();
        const contextMenuTableEl = fixture.debugElement.query(By.css(".contextMenuTreeTable"));
        const rowEls = contextMenuTableEl.queryAll(By.css("tr"));
        const event: any = document.createEvent('CustomEvent');
        const handleRowRightClickSpy = spyOn(contextMenuTreeTable,"handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        rowEls[2].nativeElement.click();
        fixture.detectChanges();
    
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTreeTable.selection[0].data.name).toEqual("Applications");
    });

    it('should filter global and show 6 item ',  async(() => {
        fixture.detectChanges();

        const globalFilter = fixture.debugElement.query(By.css(".globalFilter"));
        globalFilter.nativeElement.value = "a";
        globalFilter.nativeElement.dispatchEvent(new Event("input"));
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const tableEl = fixture.debugElement.query(By.css(".filterTreeTable"));
            const bodyRows = tableEl.query(By.css('.p-treetable-tbody')).queryAll(By.css('tr'));
            expect(bodyRows.length).toEqual(6);
        });
    }));

    it('should filter and show 1 item (contains)',  async(() => {
        fixture.detectChanges();

        const filterEls = fixture.debugElement.queryAll(By.css(".filterInput"));
        filterEls[0].nativeElement.value = "a";
        filterEls[0].nativeElement.dispatchEvent(new Event("input"));
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const tableEl = fixture.debugElement.query(By.css(".filterTreeTable"));
            let bodyRows = tableEl.query(By.css('.p-treetable-tbody')).queryAll(By.css('tr'));
            expect(bodyRows.length).toEqual(6);
            filterEls[0].nativeElement.value = "";
            filterEls[0].nativeElement.dispatchEvent(new Event("input"));
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                bodyRows = tableEl.query(By.css('.p-treetable-tbody')).queryAll(By.css('tr'));
                expect(bodyRows.length).toEqual(9);
            });
        });
    }));

    it('should filter and show 1 item (endsWith)',  async(() => {
        testcomponent.filterMode = "endsWith";
        fixture.detectChanges();

        const filterEls = fixture.debugElement.queryAll(By.css(".filterInput"));
        filterEls[0].nativeElement.value = "n";
        filterEls[0].nativeElement.dispatchEvent(new Event("input"));
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const tableEl = fixture.debugElement.query(By.css(".filterTreeTable"));
            let bodyRows = tableEl.query(By.css('.p-treetable-tbody')).queryAll(By.css('tr'));
            expect(bodyRows.length).toEqual(1);
        });
    }));

    it('should filter and show 1 item (equals)',  async(() => {
        testcomponent.filterMode = "equals";
        fixture.detectChanges();

        const filterEls = fixture.debugElement.queryAll(By.css(".filterInput"));
        filterEls[0].nativeElement.value = "Applications";
        filterEls[0].nativeElement.dispatchEvent(new Event("input"));
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const tableEl = fixture.debugElement.query(By.css(".filterTreeTable"));
            let bodyRows = tableEl.query(By.css('.p-treetable-tbody')).queryAll(By.css('tr'));
            expect(bodyRows.length).toEqual(1);
        });
    }));
});
