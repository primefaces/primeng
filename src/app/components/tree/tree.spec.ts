import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tree, UITreeNode } from './tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContextMenu, ContextMenuSub } from 'primeng/contextmenu';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { TreeDragDropService } from 'primeng/api';

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
	ngOnInit () {
		this.filesTree7 = [
			{
				"label": "Documents",
				"data": "Documents Folder",
				"expandedIcon": "pi pi-folder-open",
				"collapsedIcon": "pi pi-folder",
				"children": [{
						"label": "Work",
						"data": "Work Folder",
						"expandedIcon": "pi pi-folder-open",
						"collapsedIcon": "pi pi-folder",
						"children": [{"label": "Expenses.doc", "icon": "pi pi-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "pi pi-file-word-o", "data": "Resume Document"}]
					},
					{
						"label": "Home",
						"data": "Home Folder",
						"expandedIcon": "pi pi-folder-open",
						"collapsedIcon": "pi pi-folder",
						"children": [{"label": "Invoices.txt", "icon": "pi pi-file-word-o", "data": "Invoices for this month"}]
					}]
			},
			{
				"label": "Pictures",
				"data": "Pictures Folder",
				"expandedIcon": "pi pi-folder-open",
				"collapsedIcon": "pi pi-folder",
				"children": [
					{"label": "barcelona.jpg", "icon": "pi pi-file-image-o", "data": "Barcelona Photo"},
					{"label": "logo.jpg", "icon": "pi pi-file-image-o", "data": "PrimeFaces Logo"},
					{"label": "primeui.png", "icon": "pi pi-file-image-o", "data": "PrimeUI Logo"}]
			},
			{
				"label": "Movies",
				"data": "Movies Folder",
				"expandedIcon": "pi pi-folder-open",
				"collapsedIcon": "pi pi-folder",
				"children": [{
						"label": "Al Pacino",
						"data": "Pacino Movies",
						"children": [{"label": "Scarface", "icon": "pi pi-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-file-video-o", "data": "Serpico Movie"}]
					},
					{
						"label": "Robert De Niro",
						"data": "De Niro Movies",
						"children": [{"label": "Goodfellas", "icon": "pi pi-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-file-video-o", "data": "Untouchables Movie"}]
					}]
			}
		];
	
		this.filesTree8 = [
			{
				label: "Backup",
				data: "Backup Folder",
				expandedIcon: "pi pi-folder-open",
				collapsedIcon: "pi pi-folder"
			}
		];
		
		this.filesTree9 = [
			{
				label: "Storage",
				data: "Storage Folder",
				expandedIcon: "pi pi-folder-open",
				collapsedIcon: "pi pi-folder"
			}
		];
	
		this.items = [
			{label: 'View', icon: 'pi pi-search'},
			{label: 'Unselect', icon: 'pi pi-close'}
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
			imports: [
				NoopAnimationsModule,
				RouterTestingModule.withRoutes([
					{ path: 'test', component: ContextMenu }
				   ]),
			],
			declarations: [
				Tree,
				UITreeNode,
				ContextMenu,
				ContextMenuSub,
				TestTreeComponent
			],
			providers: [TreeDragDropService]
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
				"label": "Documents",
				"data": "Documents Folder",
				"expandedIcon": "pi pi-folder-open",
				"collapsedIcon": "pi pi-folder",
				"children": [{
						"label": "Work",
						"data": "Work Folder",
						"expandedIcon": "pi pi-folder-open",
						"collapsedIcon": "pi pi-folder",
						"children": [{"label": "Expenses.doc", "icon": "pi pi-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "pi pi-file-word-o", "data": "Resume Document"}]
					},
					{
						"label": "Home",
						"data": "Home Folder",
						"expandedIcon": "pi pi-folder-open",
						"collapsedIcon": "pi pi-folder",
						"children": [{"label": "Invoices.txt", "icon": "pi pi-file-word-o", "data": "Invoices for this month"}]
					}]
			},
			{
				"label": "Pictures",
				"data": "Pictures Folder",
				"expandedIcon": "pi pi-folder-open",
				"collapsedIcon": "pi pi-folder",
				"children": [
					{"label": "barcelona.jpg", "icon": "pi pi-file-image-o", "data": "Barcelona Photo"},
					{"label": "logo.jpg", "icon": "pi pi-file-image-o", "data": "PrimeFaces Logo"},
					{"label": "primeui.png", "icon": "pi pi-file-image-o", "data": "PrimeUI Logo"}]
			},
			{
				"label": "Movies",
				"data": "Movies Folder",
				"expandedIcon": "pi pi-folder-open",
				"collapsedIcon": "pi pi-folder",
				"children": [{
						"label": "Al Pacino",
						"data": "Pacino Movies",
						"children": [{"label": "Scarface", "icon": "pi pi-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-file-video-o", "data": "Serpico Movie"}]
					},
					{
						"label": "Robert De Niro",
						"data": "De Niro Movies",
						"children": [{"label": "Goodfellas", "icon": "pi pi-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-file-video-o", "data": "Untouchables Movie"}]
					}]
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
		const treeNodes = fixture.debugElement.queryAll(By.css("p-treeNode"));
		const documentsNode = treeNodes[0].componentInstance as UITreeNode;
		const expandSpy = spyOn(documentsNode,"expand").and.callThrough();
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
		const treeNodes = fixture.debugElement.queryAll(By.css("p-treeNode"));
		const documentsNode = treeNodes[0].componentInstance as UITreeNode;
		const collapseSpy = spyOn(documentsNode,"collapse").and.callThrough();
		expect(documentsNode.node.expanded).toBeUndefined();
		documentsToggleEl.nativeElement.click();
		fixture.detectChanges();

		documentsToggleEl.nativeElement.click();
		fixture.detectChanges();

		expect(documentsNode.node.expanded).toBeFalsy();
		expect(collapseSpy).toHaveBeenCalled();
	});

	it('should focused with nav keys', () => {
		fixture.detectChanges();
		
		const contentEls = fixture.debugElement.queryAll(By.css('.p-treenode-content'));
		const firstEl = contentEls[0];
		const secondEl = contentEls[1];
		const thirdEl = contentEls[2];
		firstEl.triggerEventHandler('keydown',{'which':40,'target':firstEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();

		const secondNode = fixture.debugElement.queryAll(By.css('.p-treenode-content'))[1];
		let focusElement = document.activeElement;
		expect(focusElement).toEqual(secondNode.nativeElement);
		secondEl.triggerEventHandler('keydown',{'which':38,'target':secondEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();
		
		const firstNode = fixture.debugElement.queryAll(By.css('.p-treenode-content'))[0];
		focusElement = document.activeElement;
		expect(focusElement).toEqual(firstNode.nativeElement);
		firstEl.triggerEventHandler('keydown',{'which':38,'target':firstEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();

		focusElement = document.activeElement;
		expect(focusElement).toEqual(firstNode.nativeElement);
		secondEl.triggerEventHandler('keydown',{'which':40,'target':secondEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();

		thirdEl.triggerEventHandler('keydown',{'which':40,'target':thirdEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();
		
		const thirdNode = fixture.debugElement.queryAll(By.css('.p-treenode-content'))[2];
		focusElement = document.activeElement;
		expect(focusElement).toEqual(thirdNode.nativeElement);
	});

	it('should expand&collapse with right and left key', () => {
		fixture.detectChanges();
		
		const contentEls = fixture.debugElement.queryAll(By.css('.p-treenode-content'));
		const treeNodes = fixture.debugElement.queryAll(By.css("p-treeNode"));
		const documentsNode = treeNodes[0].componentInstance as UITreeNode;
		const firstEl = contentEls[0];
		firstEl.triggerEventHandler('keydown',{'which':39,'target':firstEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();

		const firstElComponent = firstEl.componentInstance;
		expect(documentsNode.node.expanded).toBeTruthy();
		firstEl.triggerEventHandler('keydown',{'which':37,'target':firstEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();

		expect(documentsNode.node.expanded).toBeFalsy();
		firstEl.triggerEventHandler('keydown',{'which':13,'target':firstEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();

		expect(documentsNode.node.expanded).toBeFalsy();
		firstEl.triggerEventHandler('keydown',{'which':12,'target':firstEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();

		expect(documentsNode.node.expanded).toBeFalsy();
	});

	it('should select single and unselect with metakey', () => {
		tree.selectionMode = 'single';
		fixture.detectChanges();
		
		let selectedNode;
		tree.selectionChange.subscribe((node)=>{
			selectedNode = node;
		});
		const contentEls = fixture.debugElement.queryAll(By.css(".p-treenode-content"));
		const documentsContentEl = contentEls[0];
		const onNodeClickSpy = spyOn(tree,"onNodeClick").and.callThrough();
		documentsContentEl.nativeElement.click();
		fixture.detectChanges();

		expect(onNodeClickSpy).toHaveBeenCalled();
		expect(selectedNode.label).toEqual("Documents");
		tree.selection = selectedNode;
		documentsContentEl.triggerEventHandler("click",{'target':documentsContentEl,'ctrlKey': true});
		fixture.detectChanges();

		expect(selectedNode).toBeNull();
	});

	
	it('should select single and unselect without metakey', () => {
		tree.selectionMode = 'single';
		tree.metaKeySelection = false;
		fixture.detectChanges();
		
		const contentEls = fixture.debugElement.queryAll(By.css(".p-treenode-content"));
		const documentsContentEl = contentEls[0];
		const onNodeClickSpy = spyOn(tree,"onNodeClick").and.callThrough();
		documentsContentEl.nativeElement.click();
		fixture.detectChanges();

		expect(onNodeClickSpy).toHaveBeenCalled();
		expect(tree.selection.label).toEqual("Documents");
		documentsContentEl.nativeElement.click();
		fixture.detectChanges();

		expect(tree.selection).toBeNull();
	});

	it('should select multiple and unselect with metakey', () => {
		tree.selectionMode = 'multiple';
		fixture.detectChanges();
		
		let selectedNode;
		tree.selectionChange.subscribe((node)=>{
			selectedNode = node;
		});
		const contentEls = fixture.debugElement.queryAll(By.css(".p-treenode-content"));
		const documentsContentEl = contentEls[0];
		const picturesContentEl = contentEls[1];
		const onNodeClickSpy = spyOn(tree,"onNodeClick").and.callThrough();
		documentsContentEl.nativeElement.click();
		fixture.detectChanges();

		picturesContentEl.triggerEventHandler("click",{'target':picturesContentEl,'ctrlKey': true});
		fixture.detectChanges();

		expect(onNodeClickSpy).toHaveBeenCalled();
		expect(selectedNode[0].label).toEqual("Documents");
		expect(selectedNode[1].label).toEqual("Pictures");
		picturesContentEl.triggerEventHandler("click",{'target':picturesContentEl,'ctrlKey': true});
		fixture.detectChanges();
		expect(selectedNode.length).toEqual(1);
		documentsContentEl.triggerEventHandler("click",{'target':documentsContentEl,'ctrlKey': true});
		fixture.detectChanges();

		expect(selectedNode).toEqual([]);
	});

	
	it('should select multiple and unselect without metakey', () => {
		tree.selectionMode = 'multiple';
		tree.metaKeySelection = false;
		fixture.detectChanges();
		
		const contentEls = fixture.debugElement.queryAll(By.css(".p-treenode-content"));
		const documentsContentEl = contentEls[0];
		const picturesContentEl = contentEls[1];
		const onNodeClickSpy = spyOn(tree,"onNodeClick").and.callThrough();
		documentsContentEl.nativeElement.click();
		fixture.detectChanges();

		picturesContentEl.nativeElement.click();
		fixture.detectChanges();

		expect(onNodeClickSpy).toHaveBeenCalled();
		expect(tree.selection[0].label).toEqual("Documents");
		expect(tree.selection[1].label).toEqual("Pictures");
		picturesContentEl.nativeElement.click();
		fixture.detectChanges();
		expect(tree.selection.length).toEqual(1);
		documentsContentEl.nativeElement.click();
		fixture.detectChanges();

		expect(tree.selection).toEqual([]);
	});

	it('should select with checkbox with propagateDown and propagateUp', () => {
		tree.selectionMode = 'checkbox';
		fixture.detectChanges();
		
		let toggleEls = fixture.debugElement.queryAll(By.css('.p-tree-toggler'));
		const documentsToggleEl = toggleEls[0];
		documentsToggleEl.nativeElement.click();
		fixture.detectChanges();

		let contentEls = fixture.debugElement.queryAll(By.css(".p-treenode-content"));
		const workContentEl = contentEls[1];
		const homeContentEl = contentEls[2];
		workContentEl.nativeElement.click();
		homeContentEl.nativeElement.click();
		fixture.detectChanges();
		
		expect(tree.selection.length).toEqual(6);
		workContentEl.nativeElement.click();
		fixture.detectChanges();

		toggleEls = fixture.debugElement.queryAll(By.css('.p-tree-toggler'));
		const workToggleEl = toggleEls[1];
		expect(tree.selection.length).toEqual(2);
		workToggleEl.nativeElement.click();
		fixture.detectChanges();

		contentEls = fixture.debugElement.queryAll(By.css(".p-treenode-content"));
		const resumeContentEl = contentEls[3];
		const expensesContentEl = contentEls[2];
		resumeContentEl.nativeElement.click();
		fixture.detectChanges();

		expect(tree.selection.length).toEqual(3);
		expensesContentEl.nativeElement.click();
		fixture.detectChanges();

		expect(tree.selection.length).toEqual(6);
		expensesContentEl.nativeElement.click();
		resumeContentEl.nativeElement.click();
		fixture.detectChanges();

		expect(tree.selection.length).toEqual(2);
	});

	it('should select with second click and open the context menu', () => {
		fixture.detectChanges();

		tree.contextMenu = testComponent.cm;
		tree.selectionMode = 'single';
		fixture.detectChanges();
		
		let selectedNode;
		tree.selectionChange.subscribe(node =>{ selectedNode = node });
		const contentEls = fixture.debugElement.queryAll(By.css(".p-treenode-content"));
		const documentsContentEl = contentEls[0];
		const onNodeRightClickSpy = spyOn(tree,"onNodeRightClick").and.callThrough();
		const showSpy = spyOn(contextMenu,"show").and.callThrough();
		documentsContentEl.triggerEventHandler('contextmenu',{target: documentsContentEl.nativeElement, preventDefault(){}});
		fixture.detectChanges();

		expect(onNodeRightClickSpy).toHaveBeenCalled();
		expect(showSpy).toHaveBeenCalled();
		expect(selectedNode.label).toEqual("Documents");
	});

	it('should be filtered', () => {
		tree.filter = true;
		fixture.detectChanges();

		const filterInput = fixture.debugElement.query(By.css('.p-tree-filter'));
		expect(filterInput).toBeTruthy();
		filterInput.triggerEventHandler("input",{target:{value:'d'}});
		fixture.detectChanges();

		expect(tree.filteredNodes).toBeTruthy();
		expect(tree.filteredNodes.length).toEqual(2);
	});


	it('should drop item from files to server2', () => {
		fixture.detectChanges();

		let fileTreeContentEls = fixture.debugElement.children[2].queryAll(By.css('.p-treenode-content'));
		expect(fileTreeContentEls.length).toEqual(3);
		const documentsContentEl = fileTreeContentEls[0];
		const onDragStartSpy = spyOn(documentsContentEl.componentInstance,"onDragStart").and.callThrough();
		const startDragSpy = spyOn(filesTree.dragDropService,"startDrag").and.callThrough();
		const onDropSpy = spyOn(server2Tree,"onDrop").and.callThrough();
		documentsContentEl.triggerEventHandler("dragstart",{dataTransfer:new DataTransfer});
		fixture.detectChanges();
		
		expect(onDragStartSpy).toHaveBeenCalled();
		expect(startDragSpy).toHaveBeenCalled();
		expect(documentsContentEl.componentInstance).toEqual(filesTree.dragNodeTree);
		expect(filesTree.dragNode.label).toEqual("Documents");
		expect(filesTree.dragNodeIndex).toEqual(0);
		const picturesContentEl = fileTreeContentEls[1];
		picturesContentEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		picturesContentEl.triggerEventHandler("dragleave",{currentTarget:picturesContentEl.nativeElement});
		const fileTreeEl = fixture.debugElement.children[2].query(By.css('div'));
		const server2TreeEl = fixture.debugElement.children[4].query(By.css('div'));
		const onDragLeaveSpy =spyOn(filesTree,"onDragLeave").and.callThrough();
		const onDragEnterSpy =spyOn(server2Tree,"onDragEnter").and.callThrough();
		fileTreeEl.triggerEventHandler("dragleave",{currentTarget:fileTreeEl.nativeElement});
		expect(onDragLeaveSpy).toHaveBeenCalled();
		server2TreeEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		expect(onDragEnterSpy).toHaveBeenCalled();
		const server2DropPoints = server2TreeEl.queryAll(By.css('.p-treenode-droppoint'));
		const serverContentEl = server2TreeEl.query(By.css('.p-treenode-content'));
		expect(server2DropPoints.length).toEqual(2);
		server2DropPoints[0].triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		server2DropPoints[0].triggerEventHandler("dragleave",{currentTarget:fileTreeEl.nativeElement});
		serverContentEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		serverContentEl.triggerEventHandler("dragleave",{currentTarget:fileTreeEl.nativeElement});
		server2DropPoints[1].triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		let dropEvent;
		server2Tree.onNodeDrop.subscribe((event) => {dropEvent = event});
		server2TreeEl.triggerEventHandler("drop",{preventDefault(){}});
		server2DropPoints[1].triggerEventHandler("drop",{preventDefault(){}});
		fixture.detectChanges();

		fileTreeContentEls = fixture.debugElement.children[2].queryAll(By.css('.p-treenode-content'));
		expect(fileTreeContentEls.length).toEqual(2);
		expect(dropEvent.dragNode.label).toEqual("Documents");
		expect(dropEvent.dropNode.label).toEqual("Storage");
		expect(dropEvent.dropIndex).toEqual(0);
		expect(onDropSpy).toHaveBeenCalled();
	});

	it('should drop item to inside of node', () => {
		fixture.detectChanges();

		let fileTreeContentEls = fixture.debugElement.children[2].queryAll(By.css('.p-treenode-content'));
		expect(fileTreeContentEls.length).toEqual(3);
		const documentsContentEl = fileTreeContentEls[0];
		const onDragStartSpy = spyOn(documentsContentEl.componentInstance,"onDragStart").and.callThrough();
		const startDragSpy = spyOn(filesTree.dragDropService,"startDrag").and.callThrough();
		documentsContentEl.triggerEventHandler("dragstart",{dataTransfer:new DataTransfer});
		fixture.detectChanges();
		
		expect(onDragStartSpy).toHaveBeenCalled();
		expect(startDragSpy).toHaveBeenCalled();
		expect(documentsContentEl.componentInstance).toEqual(filesTree.dragNodeTree);
		expect(filesTree.dragNode.label).toEqual("Documents");
		expect(filesTree.dragNodeIndex).toEqual(0);
		const picturesContentEl = fileTreeContentEls[1];
		picturesContentEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		picturesContentEl.triggerEventHandler("dragleave",{currentTarget:picturesContentEl.nativeElement});
		const fileTreeEl = fixture.debugElement.children[2].query(By.css('div'));
		const server2TreeEl = fixture.debugElement.children[4].query(By.css('div'));
		const onDragLeaveSpy =spyOn(filesTree,"onDragLeave").and.callThrough();
		const onDragEnterSpy =spyOn(server2Tree,"onDragEnter").and.callThrough();
		fileTreeEl.triggerEventHandler("dragleave",{currentTarget:fileTreeEl.nativeElement});
		expect(onDragLeaveSpy).toHaveBeenCalled();
		server2TreeEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		expect(onDragEnterSpy).toHaveBeenCalled();
		const server2DropPoints = server2TreeEl.queryAll(By.css('.p-treenode-droppoint'));
		const serverContentEl = server2TreeEl.query(By.css('.p-treenode-content'));
		expect(server2DropPoints.length).toEqual(2);
		server2DropPoints[0].triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		server2DropPoints[0].triggerEventHandler("dragleave",{currentTarget:fileTreeEl.nativeElement});
		serverContentEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		serverContentEl.triggerEventHandler("dragleave",{currentTarget:fileTreeEl.nativeElement});
		server2DropPoints[1].triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		server2DropPoints[1].triggerEventHandler("dragleave",{dataTransfer:new DataTransfer});
		serverContentEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		serverContentEl.triggerEventHandler("dragover",{dataTransfer:new DataTransfer,preventDefault(){},stopPropagation(){}});
		let dropEvent;
		server2Tree.onNodeDrop.subscribe((event) => {dropEvent = event});
		serverContentEl.triggerEventHandler("drop",{preventDefault(){},stopPropagation(){}});
		serverContentEl.triggerEventHandler("dragend",{dataTransfer:new DataTransfer,preventDefault(){},stopPropagation(){}});
		fixture.detectChanges();

		fileTreeContentEls = fixture.debugElement.children[2].queryAll(By.css('.p-treenode-content'));
		expect(fileTreeContentEls.length).toEqual(2);
		expect(dropEvent.dragNode.label).toEqual("Documents");
		expect(dropEvent.dropNode.label).toEqual("Storage");
	});

	it('should drop item from files to server2(empty)', () => {
		fixture.detectChanges();

		server2Tree.value = [];
		let fileTreeContentEls = fixture.debugElement.children[2].queryAll(By.css('.p-treenode-content'));
		expect(fileTreeContentEls.length).toEqual(3);
		const documentsContentEl = fileTreeContentEls[0];
		const onDragStartSpy = spyOn(documentsContentEl.componentInstance,"onDragStart").and.callThrough();
		const startDragSpy = spyOn(filesTree.dragDropService,"startDrag").and.callThrough();
		const onDropSpy = spyOn(server2Tree,"onDrop").and.callThrough();
		documentsContentEl.triggerEventHandler("dragstart",{dataTransfer:new DataTransfer});
		fixture.detectChanges();
		
		expect(onDragStartSpy).toHaveBeenCalled();
		expect(startDragSpy).toHaveBeenCalled();
		expect(documentsContentEl.componentInstance).toEqual(filesTree.dragNodeTree);
		expect(filesTree.dragNode.label).toEqual("Documents");
		expect(filesTree.dragNodeIndex).toEqual(0);
		const picturesContentEl = fileTreeContentEls[1];
		picturesContentEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		picturesContentEl.triggerEventHandler("dragleave",{currentTarget:picturesContentEl.nativeElement});
		const fileTreeEl = fixture.debugElement.children[2].query(By.css('div'));
		const server2TreeEl = fixture.debugElement.children[4].query(By.css('div'));
		const onDragLeaveSpy =spyOn(filesTree,"onDragLeave").and.callThrough();
		const onDragEnterSpy =spyOn(server2Tree,"onDragEnter").and.callThrough();
		fileTreeEl.triggerEventHandler("dragleave",{currentTarget:fileTreeEl.nativeElement});
		expect(onDragLeaveSpy).toHaveBeenCalled();
		server2TreeEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		expect(onDragEnterSpy).toHaveBeenCalled();
		server2TreeEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		server2TreeEl.triggerEventHandler("dragleave",{currentTarget:fileTreeEl.nativeElement});
		server2TreeEl.triggerEventHandler("dragenter",{dataTransfer:new DataTransfer});
		server2TreeEl.triggerEventHandler("drop",{preventDefault(){}});
		fixture.detectChanges();

		fileTreeContentEls = fixture.debugElement.children[2].queryAll(By.css('.p-treenode-content'));
		expect(fileTreeContentEls.length).toEqual(2);
		expect(onDropSpy).toHaveBeenCalled();
	});
});
