import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tree, UITreeNode } from './tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Tree', () => {

	let tree: Tree;
	let fixture: ComponentFixture<Tree>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				Tree,
				UITreeNode
			]
		});

		fixture = TestBed.createComponent(Tree);
		tree = fixture.componentInstance;
		tree.value = [
			{
				"label": "Documents",
				"data": "Documents Folder",
				"expandedIcon": "fa fa-folder-open",
				"collapsedIcon": "fa fa-folder",
				"children": [{
						"label": "Work",
						"data": "Work Folder",
						"expandedIcon": "fa fa-folder-open",
						"collapsedIcon": "fa fa-folder",
						"children": [{"label": "Expenses.doc", "icon": "fa fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa fa-file-word-o", "data": "Resume Document"}]
					},
					{
						"label": "Home",
						"data": "Home Folder",
						"expandedIcon": "fa fa-folder-open",
						"collapsedIcon": "fa fa-folder",
						"children": [{"label": "Invoices.txt", "icon": "fa fa-file-word-o", "data": "Invoices for this month"}]
					}]
			},
			{
				"label": "Pictures",
				"data": "Pictures Folder",
				"expandedIcon": "fa fa-folder-open",
				"collapsedIcon": "fa fa-folder",
				"children": [
					{"label": "barcelona.jpg", "icon": "fa fa-file-image-o", "data": "Barcelona Photo"},
					{"label": "logo.jpg", "icon": "fa fa-file-image-o", "data": "PrimeFaces Logo"},
					{"label": "primeui.png", "icon": "fa fa-file-image-o", "data": "PrimeUI Logo"}]
			},
			{
				"label": "Movies",
				"data": "Movies Folder",
				"expandedIcon": "fa fa-folder-open",
				"collapsedIcon": "fa fa-folder",
				"children": [{
						"label": "Al Pacino",
						"data": "Pacino Movies",
						"children": [{"label": "Scarface", "icon": "fa fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa fa-file-video-o", "data": "Serpico Movie"}]
					},
					{
						"label": "Robert De Niro",
						"data": "De Niro Movies",
						"children": [{"label": "Goodfellas", "icon": "fa fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa fa-file-video-o", "data": "Untouchables Movie"}]
					}]
			}
		];
	});

	it('should created', () => {
		fixture.detectChanges();
  
		const treeEl = fixture.debugElement.query(By.css('.ui-tree'));
		expect(treeEl.nativeElement).toBeTruthy();
	});
	  
	it('should call toggle and expand clicked row', () => {
		fixture.detectChanges();
  
		const toggleEls = fixture.debugElement.queryAll(By.css('.ui-tree-toggler'));
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
  
		const toggleEls = fixture.debugElement.queryAll(By.css('.ui-tree-toggler'));
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
		
		const contentEls = fixture.debugElement.queryAll(By.css('.ui-treenode-content'));
		const firstEl = contentEls[0];
		const secondEl = contentEls[1];
		const thirdEl = contentEls[2];
		firstEl.triggerEventHandler('keydown',{'which':40,'target':firstEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();

		const secondNode = fixture.debugElement.queryAll(By.css('.ui-treenode-content'))[1];
		let focusElement = document.activeElement;
		expect(focusElement).toEqual(secondNode.nativeElement);
		secondEl.triggerEventHandler('keydown',{'which':38,'target':secondEl.nativeElement,preventDefault (){}});
		fixture.detectChanges();
		
		const firstNode = fixture.debugElement.queryAll(By.css('.ui-treenode-content'))[0];
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
		
		const thirdNode = fixture.debugElement.queryAll(By.css('.ui-treenode-content'))[2];
		focusElement = document.activeElement;
		expect(focusElement).toEqual(thirdNode.nativeElement);
	});

	it('should expand&collapse with right and left key', () => {
		fixture.detectChanges();
		
		const contentEls = fixture.debugElement.queryAll(By.css('.ui-treenode-content'));
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
		const contentEls = fixture.debugElement.queryAll(By.css(".ui-treenode-content"));
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
		
		const contentEls = fixture.debugElement.queryAll(By.css(".ui-treenode-content"));
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
		const contentEls = fixture.debugElement.queryAll(By.css(".ui-treenode-content"));
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
		
		const contentEls = fixture.debugElement.queryAll(By.css(".ui-treenode-content"));
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
});
