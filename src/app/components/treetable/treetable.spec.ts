import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TreeTable, TreeTableModule } from './treetable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';

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
`
})
class TestTreeTableComponent {
    selectedNode:any;
    cols = [
        { field: 'name', header: 'Name' },
        { field: 'size', header: 'Size' },
        { field: 'type', header: 'Type' }
    ];
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
    let fixture: ComponentFixture<TestTreeTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule,
                ScrollingModule,
                TreeTableModule
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
        const toggleEls = basicTreeTableEl.queryAll(By.css(".ui-treetable-toggler"));
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
        let toggleEls = basicTreeTableEl.queryAll(By.css(".ui-treetable-toggler"));
        const firstToggleComp = toggleEls[0].componentInstance;
        const onClickSpy = spyOn(firstToggleComp,"onClick").and.callThrough();
        toggleEls[0].nativeElement.click();
        fixture.detectChanges();

        rowEls = basicTreeTableEl.queryAll(By.css("tr"));
        expect(rowEls.length).toEqual(14);
        toggleEls = basicTreeTableEl.queryAll(By.css(".ui-treetable-toggler"));
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
        const captionEl = basicTreeTableEl.query(By.css(".ui-treetable-caption"));
        const summaryEl = basicTreeTableEl.query(By.css(".ui-treetable-summary"));
        const footerEl = basicTreeTableEl.query(By.css(".ui-treetable-tfoot"));
        expect(captionEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(footerEl).toBeTruthy();
    });
    
    it('should create paginator and 4 rows', () => {
        fixture.detectChanges();
  
        const paginationTreeTableEl = fixture.debugElement.query(By.css(".paginationTreeTable"));
        let rowEls = paginationTreeTableEl.queryAll(By.css("tr"));
        const paginatorEl = paginationTreeTableEl.query(By.css("p-paginator"));
        const pages = paginationTreeTableEl.queryAll(By.css(".ui-paginator-page"));

        expect(rowEls.length).toEqual(4);
        expect(paginatorEl).toBeTruthy();
        expect(pages.length).toEqual(3);
    });

    it('should change page', () => {
        fixture.detectChanges();
  
        const paginationTreeTableEl = fixture.debugElement.query(By.css(".paginationTreeTable"));
        const pages = paginationTreeTableEl.queryAll(By.css(".ui-paginator-page"));
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
});
