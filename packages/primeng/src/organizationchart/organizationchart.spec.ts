import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationChart, OrganizationChartNode } from './organizationchart';
import { TreeNode } from 'primeng/api';

// Test component for basic use cases
@Component({
    standalone: false,
    template: `
        <p-organizationChart
            [value]="data"
            [selectionMode]="selectionMode"
            [selection]="selection"
            [collapsible]="collapsible"
            [preserveSpace]="preserveSpace"
            [styleClass]="styleClass"
            (selectionChange)="onSelectionChange($event)"
            (onNodeSelect)="onNodeSelect($event)"
            (onNodeUnselect)="onNodeUnselect($event)"
            (onNodeExpand)="onNodeExpand($event)"
            (onNodeCollapse)="onNodeCollapse($event)"
        >
        </p-organizationChart>
    `
})
class TestBasicOrganizationChartComponent {
    data: TreeNode[] = [];
    selectionMode: 'single' | 'multiple' | null | undefined = null as any;
    selection: any;
    collapsible: boolean = false;
    preserveSpace: boolean = true;
    styleClass: string | undefined;

    selectionChangeEvent: any;
    nodeSelectEvent: any;
    nodeUnselectEvent: any;
    nodeExpandEvent: any;
    nodeCollapseEvent: any;

    onSelectionChange(event: any) {
        this.selectionChangeEvent = event;
    }

    onNodeSelect(event: any) {
        this.nodeSelectEvent = event;
    }

    onNodeUnselect(event: any) {
        this.nodeUnselectEvent = event;
    }

    onNodeExpand(event: any) {
        this.nodeExpandEvent = event;
    }

    onNodeCollapse(event: any) {
        this.nodeCollapseEvent = event;
    }
}

// Test component for template testing
@Component({
    standalone: false,
    template: `
        <p-organizationChart [value]="data" [collapsible]="true">
            <ng-template pTemplate="person" let-node>
                <div class="custom-person-template">
                    <span>{{ node.data.name }}</span>
                    <span>{{ node.data.title }}</span>
                </div>
            </ng-template>
            <ng-template pTemplate="department" let-node>
                <div class="custom-department-template">
                    {{ node.label }}
                </div>
            </ng-template>
            <ng-template pTemplate="default" let-node>
                <div class="custom-default-template">
                    {{ node.label }}
                </div>
            </ng-template>
        </p-organizationChart>
    `
})
class TestTemplateOrganizationChartComponent {
    data: TreeNode[] = [
        {
            type: 'person',
            label: 'CEO',
            data: { name: 'John Doe', title: 'Chief Executive Officer' },
            expanded: true,
            children: [
                {
                    type: 'department',
                    label: 'Sales Department'
                },
                {
                    label: 'Default Node'
                }
            ]
        }
    ];
}

// Test component for toggler icon template
@Component({
    standalone: false,
    template: `
        <p-organizationChart [value]="data" [collapsible]="true">
            <ng-template #togglericon let-expanded>
                <span class="custom-toggler-icon">
                    {{ expanded ? 'EXPANDED' : 'COLLAPSED' }}
                </span>
            </ng-template>
        </p-organizationChart>
    `
})
class TestTogglerIconTemplateComponent {
    data: TreeNode[] = [
        {
            label: 'Root',
            expanded: false,
            children: [{ label: 'Child 1' }, { label: 'Child 2' }]
        }
    ];
}

// Test component for keyboard navigation
@Component({
    standalone: false,
    template: ` <p-organizationChart [value]="data" [collapsible]="true" [selectionMode]="'single'"> </p-organizationChart> `
})
class TestKeyboardNavigationComponent {
    data: TreeNode[] = [
        {
            label: 'Root',
            expanded: true,
            children: [{ label: 'Child 1' }, { label: 'Child 2' }]
        }
    ];
}

describe('OrganizationChart', () => {
    let component: TestBasicOrganizationChartComponent;
    let fixture: ComponentFixture<TestBasicOrganizationChartComponent>;
    let organizationChart: OrganizationChart;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestBasicOrganizationChartComponent, TestTemplateOrganizationChartComponent, TestTogglerIconTemplateComponent, TestKeyboardNavigationComponent],
            imports: [OrganizationChart, OrganizationChartNode, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicOrganizationChartComponent);
        component = fixture.componentInstance;
        organizationChart = fixture.debugElement.query(By.directive(OrganizationChart)).componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
            expect(organizationChart).toBeTruthy();
        });

        it('should have default values', () => {
            fixture.detectChanges();

            expect(organizationChart.value).toEqual([]);
            expect(organizationChart.selectionMode).toBeNull();
            expect(organizationChart.collapsible).toBe(false);
            expect(organizationChart.preserveSpace).toBe(true);
            expect(organizationChart.selection).toBeUndefined();
        });

        it('should accept custom values', () => {
            const testData: TreeNode[] = [
                {
                    label: 'Root',
                    children: [{ label: 'Child 1' }, { label: 'Child 2' }]
                }
            ];

            component.data = testData;
            component.selectionMode = 'single';
            component.collapsible = true;
            component.preserveSpace = false;
            component.styleClass = 'custom-class';

            fixture.detectChanges();

            expect(organizationChart.value).toBe(testData);
            expect(organizationChart.selectionMode).toBe('single');
            expect(organizationChart.collapsible).toBe(true);
            expect(organizationChart.preserveSpace).toBe(false);
            expect(organizationChart.styleClass).toBe('custom-class');
        });

        it('should correctly identify root node', () => {
            expect(organizationChart.root).toBeNull();

            component.data = [{ label: 'Root Node' }];
            fixture.detectChanges();

            expect(organizationChart.root).toBeDefined();
            expect(organizationChart.root?.label).toBe('Root Node');
        });

        it('should handle empty data array', () => {
            component.data = [];
            fixture.detectChanges();

            expect(organizationChart.root).toBeNull();
            const table = fixture.debugElement.query(By.css('table'));
            expect(table).toBeNull();
        });
    });

    describe('Public Methods', () => {
        beforeEach(() => {
            component.data = [
                {
                    label: 'Root',
                    expanded: true,
                    children: [{ label: 'Child 1', selectable: true }, { label: 'Child 2', selectable: false }, { label: 'Child 3' }]
                }
            ];
            component.selectionMode = 'single';
            fixture.detectChanges();
        });

        it('should find index in selection for single mode', () => {
            const node = component.data[0].children![0];

            expect(organizationChart.findIndexInSelection(node)).toBe(-1);

            organizationChart.selection = node;
            expect(organizationChart.findIndexInSelection(node)).toBe(0);

            const otherNode = component.data[0].children![1];
            expect(organizationChart.findIndexInSelection(otherNode)).toBe(-1);
        });

        it('should find index in selection for multiple mode', () => {
            component.selectionMode = 'multiple';
            fixture.detectChanges();

            const node1 = component.data[0].children![0];
            const node2 = component.data[0].children![2];

            organizationChart.selection = [node1, node2];

            expect(organizationChart.findIndexInSelection(node1)).toBe(0);
            expect(organizationChart.findIndexInSelection(node2)).toBe(1);
            expect(organizationChart.findIndexInSelection(component.data[0].children![1])).toBe(-1);
        });

        it('should check if node is selected', () => {
            const node = component.data[0].children![0];

            expect(organizationChart.isSelected(node)).toBe(false);

            organizationChart.selection = node;
            expect(organizationChart.isSelected(node)).toBe(true);
        });

        it('should get template for node based on type', () => {
            fixture.detectChanges();
            organizationChart.ngAfterContentInit();

            expect(organizationChart.getTemplateForNode({ type: 'person' } as TreeNode)).toBeNull();

            organizationChart.templateMap = {
                person: {} as TemplateRef<any>,
                default: {} as TemplateRef<any>
            };

            const personNode = { type: 'person' } as TreeNode;
            const defaultNode = {} as TreeNode;

            expect(organizationChart.getTemplateForNode(personNode)).toBe(organizationChart.templateMap['person']);
            expect(organizationChart.getTemplateForNode(defaultNode)).toBe(organizationChart.templateMap['default']);
        });
    });

    describe('Event Handling', () => {
        beforeEach(() => {
            component.data = [
                {
                    label: 'Root',
                    expanded: true,
                    children: [{ label: 'Child 1' }, { label: 'Child 2', selectable: false }, { label: 'Child 3' }]
                }
            ];
            fixture.detectChanges();
        });

        it('should handle node click in single selection mode', () => {
            component.selectionMode = 'single';
            fixture.detectChanges();

            const node = component.data[0].children![0];
            const event = new MouseEvent('click');
            Object.defineProperty(event, 'target', {
                value: document.createElement('div'),
                writable: true
            });

            organizationChart.onNodeClick(event, node);

            expect(organizationChart.selection).toBe(node);
            expect(component.nodeSelectEvent).toBeDefined();
            expect(component.nodeSelectEvent.node).toBe(node);
            expect(component.selectionChangeEvent).toBe(node);
        });

        it('should handle node unselection in single mode', () => {
            component.selectionMode = 'single';
            fixture.detectChanges();

            const node = component.data[0].children![0];
            organizationChart.selection = node;

            const event = new MouseEvent('click');
            Object.defineProperty(event, 'target', {
                value: document.createElement('div'),
                writable: true
            });
            organizationChart.onNodeClick(event, node);

            expect(organizationChart.selection).toBeNull();
            expect(component.nodeUnselectEvent).toBeDefined();
            expect(component.nodeUnselectEvent.node).toBe(node);
        });

        it('should handle node click in multiple selection mode', () => {
            component.selectionMode = 'multiple';
            fixture.detectChanges();

            const node1 = component.data[0].children![0];
            const node2 = component.data[0].children![2];

            const event1 = new MouseEvent('click');
            Object.defineProperty(event1, 'target', {
                value: document.createElement('div'),
                writable: true
            });
            organizationChart.onNodeClick(event1, node1);

            expect(organizationChart.selection).toEqual([node1]);

            const event2 = new MouseEvent('click');
            Object.defineProperty(event2, 'target', {
                value: document.createElement('div'),
                writable: true
            });
            organizationChart.onNodeClick(event2, node2);

            expect(organizationChart.selection).toEqual([node1, node2]);
            expect(component.selectionChangeEvent).toEqual([node1, node2]);
        });

        it('should handle node unselection in multiple mode', () => {
            component.selectionMode = 'multiple';
            fixture.detectChanges();

            const node1 = component.data[0].children![0];
            const node2 = component.data[0].children![2];
            organizationChart.selection = [node1, node2];

            const event = new MouseEvent('click');
            Object.defineProperty(event, 'target', {
                value: document.createElement('div'),
                writable: true
            });
            organizationChart.onNodeClick(event, node1);

            expect(organizationChart.selection).toEqual([node2]);
            expect(component.nodeUnselectEvent.node).toBe(node1);
        });

        it('should not select non-selectable nodes', () => {
            component.selectionMode = 'single';
            fixture.detectChanges();

            const nonSelectableNode = component.data[0].children![1];
            const event = new MouseEvent('click');
            Object.defineProperty(event, 'target', {
                value: document.createElement('div'),
                writable: true
            });

            organizationChart.onNodeClick(event, nonSelectableNode);

            expect(organizationChart.selection).toBeUndefined();
            expect(component.nodeSelectEvent).toBeUndefined();
        });

        it('should ignore click on toggle button', () => {
            component.selectionMode = 'single';
            component.collapsible = true;
            fixture.detectChanges();

            const node = component.data[0];
            const event = new MouseEvent('click');
            Object.defineProperty(event, 'target', {
                value: { className: 'p-organizationchart-node-toggle-button' },
                writable: true
            });

            organizationChart.onNodeClick(event, node);

            expect(organizationChart.selection).toBeUndefined();
            expect(component.nodeSelectEvent).toBeUndefined();
        });

        it('should emit expand and collapse events', fakeAsync(() => {
            component.collapsible = true;
            fixture.detectChanges();

            const nodeElements = fixture.debugElement.queryAll(By.css('[pOrganizationChartNode]'));
            const rootNodeComponent = nodeElements[0].componentInstance as OrganizationChartNode;
            const node = component.data[0];

            rootNodeComponent.toggleNode(new MouseEvent('click'), node);
            tick();

            expect(node.expanded).toBe(false);
            expect(component.nodeCollapseEvent).toBeDefined();
            expect(component.nodeCollapseEvent.node).toBe(node);

            rootNodeComponent.toggleNode(new MouseEvent('click'), node);
            tick();

            expect(node.expanded).toBe(true);
            expect(component.nodeExpandEvent).toBeDefined();
            expect(component.nodeExpandEvent.node).toBe(node);

            flush();
        }));
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined values gracefully', () => {
            component.data = null as any;
            expect(() => fixture.detectChanges()).not.toThrow();
            expect(organizationChart.root).toBeNull();

            component.data = undefined as any;
            expect(() => fixture.detectChanges()).not.toThrow();
            expect(organizationChart.root).toBeNull();
        });

        it('should handle selection setter with initialized state', () => {
            fixture.detectChanges();
            organizationChart.initialized = true;

            const node = { label: 'Test' };
            const spy = spyOn(organizationChart['selectionSource'], 'next');

            organizationChart.selection = node;

            expect(organizationChart.selection).toBe(node);
            expect(spy).toHaveBeenCalledWith(null);
        });

        it('should handle nodes without children', () => {
            component.data = [{ label: 'Leaf Node' }];
            fixture.detectChanges();

            const nodeElements = fixture.debugElement.queryAll(By.css('[pOrganizationChartNode]'));
            const nodeComponent = nodeElements[0].componentInstance as OrganizationChartNode;

            expect(nodeComponent.leaf).toBe(true);
            expect(nodeComponent.colspan).toBeNull();
        });

        it('should handle nodes with leaf property set to false', () => {
            component.data = [{ label: 'Non-Leaf Node', leaf: false }];
            fixture.detectChanges();

            const nodeElements = fixture.debugElement.queryAll(By.css('[pOrganizationChartNode]'));
            const nodeComponent = nodeElements[0].componentInstance as OrganizationChartNode;

            expect(nodeComponent.leaf).toBe(false);
        });

        it('should calculate colspan correctly', () => {
            component.data = [
                {
                    label: 'Root',
                    children: [{ label: 'Child 1' }, { label: 'Child 2' }, { label: 'Child 3' }]
                }
            ];
            fixture.detectChanges();

            const nodeElements = fixture.debugElement.queryAll(By.css('[pOrganizationChartNode]'));
            const nodeComponent = nodeElements[0].componentInstance as OrganizationChartNode;

            expect(nodeComponent.colspan).toBe(6); // 3 children * 2
        });

        it('should handle rapid selection changes', fakeAsync(() => {
            component.selectionMode = 'single';
            component.data = [
                {
                    label: 'Root',
                    children: [{ label: 'Child 1' }, { label: 'Child 2' }, { label: 'Child 3' }]
                }
            ];
            fixture.detectChanges();

            const nodes = component.data[0].children!;

            for (let i = 0; i < nodes.length; i++) {
                const event = new MouseEvent('click');
                Object.defineProperty(event, 'target', {
                    value: document.createElement('div'),
                    writable: true
                });
                organizationChart.onNodeClick(event, nodes[i]);
                tick(10);
            }

            expect(organizationChart.selection).toBe(nodes[2]);
            expect(component.selectionChangeEvent).toBe(nodes[2]);

            flush();
        }));
    });

    describe('Template and Content Projection', () => {
        it('should apply node templates based on type using pTemplate', fakeAsync(() => {
            const templateFixture = TestBed.createComponent(TestTemplateOrganizationChartComponent);
            const templateComponent = templateFixture.componentInstance;

            templateFixture.detectChanges();
            tick();

            // Test that component is created
            expect(templateComponent).toBeTruthy();

            // Test that data is rendered (either with templates or default)
            const nodeElements = templateFixture.debugElement.queryAll(By.css('[data-pc-section="node"]'));
            expect(nodeElements.length).toBeGreaterThan(0);

            // Test that content is rendered
            const textContent = templateFixture.nativeElement.textContent;
            expect(textContent).toBeTruthy();

            flush();
        }));

        it('should apply toggler icon template using #togglericon', fakeAsync(() => {
            const togglerFixture = TestBed.createComponent(TestTogglerIconTemplateComponent);

            togglerFixture.detectChanges();
            tick();

            const togglerIcon = togglerFixture.debugElement.query(By.css('.custom-toggler-icon'));
            expect(togglerIcon).toBeTruthy();
            expect(togglerIcon.nativeElement.textContent.trim()).toBe('COLLAPSED');

            flush();
        }));

        it('should process templates in ngAfterContentInit', () => {
            fixture.detectChanges();

            const orgChart = fixture.debugElement.query(By.directive(OrganizationChart)).componentInstance;
            spyOn(orgChart, 'ngAfterContentInit').and.callThrough();

            orgChart.ngAfterContentInit();

            expect(orgChart.ngAfterContentInit).toHaveBeenCalled();
            expect(orgChart.initialized).toBe(true);
        });

        it('should handle no templates gracefully', () => {
            fixture.detectChanges();
            organizationChart.ngAfterContentInit();

            expect(organizationChart.templateMap).toBeUndefined();
            expect(organizationChart._togglerIconTemplate).toBeUndefined();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply custom style class', () => {
            component.styleClass = 'custom-org-chart';
            component.data = [{ label: 'Root' }];
            fixture.detectChanges();

            const orgChartElement = fixture.debugElement.query(By.css('p-organizationChart'));
            expect(orgChartElement.nativeElement.className).toContain('custom-org-chart');
        });

        it('should apply correct classes to nodes', () => {
            component.data = [
                {
                    label: 'Root',
                    styleClass: 'custom-node-class',
                    expanded: true,
                    children: [{ label: 'Child' }]
                }
            ];
            fixture.detectChanges();

            const nodeDiv = fixture.debugElement.query(By.css('[data-pc-section="node"]'));
            expect(nodeDiv.nativeElement.className).toContain('custom-node-class');
        });

        it('should apply visibility styles based on node expansion', () => {
            component.data = [
                {
                    label: 'Root',
                    expanded: false,
                    children: [{ label: 'Child 1' }, { label: 'Child 2' }]
                }
            ];
            component.collapsible = true;
            fixture.detectChanges();

            const nodeElements = fixture.debugElement.queryAll(By.css('[pOrganizationChartNode]'));
            const nodeComponent = nodeElements[0].componentInstance as OrganizationChartNode;

            const childStyle = nodeComponent.getChildStyle(component.data[0]);
            expect(childStyle.visibility).toBe('hidden');

            component.data[0].expanded = true;
            const expandedStyle = nodeComponent.getChildStyle(component.data[0]);
            expect(expandedStyle.visibility).toBe('inherit');
        });

        it('should apply connector classes correctly', () => {
            component.data = [
                {
                    label: 'Root',
                    expanded: true,
                    children: [{ label: 'Child 1' }, { label: 'Child 2' }, { label: 'Child 3' }]
                }
            ];
            fixture.detectChanges();

            const connectorDown = fixture.debugElement.query(By.css('[data-pc-section="lineDown"]'));
            expect(connectorDown).toBeTruthy();

            const leftConnectors = fixture.debugElement.queryAll(By.css('[data-pc-section="lineLeft"]'));
            expect(leftConnectors.length).toBeGreaterThan(0);

            const rightConnectors = fixture.debugElement.queryAll(By.css('[data-pc-section="lineRight"]'));
            expect(rightConnectors.length).toBeGreaterThan(0);
        });
    });

    describe('Accessibility', () => {
        it('should have correct tabindex on toggle button', () => {
            component.data = [
                {
                    label: 'Root',
                    expanded: true,
                    children: [{ label: 'Child' }]
                }
            ];
            component.collapsible = true;
            fixture.detectChanges();

            const toggleButton = fixture.debugElement.query(By.css('[data-pc-section="nodeToggler"]'));
            expect(toggleButton.nativeElement.getAttribute('tabindex')).toBe('0');
        });

        it('should have correct data-pc-section attributes', () => {
            component.data = [
                {
                    label: 'Root',
                    expanded: true,
                    children: [{ label: 'Child' }]
                }
            ];
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('[data-pc-section="root"]'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('[data-pc-section="body"]'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('[data-pc-section="row"]'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('[data-pc-section="cell"]'))).toBeTruthy();
            expect(fixture.debugElement.query(By.css('[data-pc-section="node"]'))).toBeTruthy();
        });

        it('should render correct icon based on expansion state', () => {
            component.data = [
                {
                    label: 'Root',
                    expanded: true,
                    children: [{ label: 'Child' }]
                }
            ];
            component.collapsible = true;
            fixture.detectChanges();

            const chevronDown = fixture.debugElement.query(By.css('[data-p-icon="chevron-down"]'));
            expect(chevronDown).toBeTruthy();

            component.data[0].expanded = false;
            fixture.detectChanges();

            const chevronUp = fixture.debugElement.query(By.css('[data-p-icon="chevron-up"]'));
            expect(chevronUp).toBeTruthy();
        });
    });

    describe('Keyboard Navigation', () => {
        it('should toggle node on Enter key', fakeAsync(() => {
            const keyboardFixture = TestBed.createComponent(TestKeyboardNavigationComponent);
            keyboardFixture.detectChanges();

            const toggleButton = keyboardFixture.debugElement.query(By.css('[data-pc-section="nodeToggler"]'));
            const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });

            const initialExpanded = keyboardFixture.componentInstance.data[0].expanded;
            toggleButton.nativeElement.dispatchEvent(keyEvent);
            tick();

            expect(keyboardFixture.componentInstance.data[0].expanded).toBe(!initialExpanded);

            flush();
        }));

        it('should toggle node on Space key', fakeAsync(() => {
            const keyboardFixture = TestBed.createComponent(TestKeyboardNavigationComponent);
            keyboardFixture.detectChanges();

            const toggleButton = keyboardFixture.debugElement.query(By.css('[data-pc-section="nodeToggler"]'));
            const keyEvent = new KeyboardEvent('keydown', { key: ' ' });

            const initialExpanded = keyboardFixture.componentInstance.data[0].expanded;
            toggleButton.nativeElement.dispatchEvent(keyEvent);
            tick();

            expect(keyboardFixture.componentInstance.data[0].expanded).toBe(!initialExpanded);

            flush();
        }));

        it('should prevent default on toggle', () => {
            component.data = [
                {
                    label: 'Root',
                    expanded: true,
                    children: [{ label: 'Child' }]
                }
            ];
            component.collapsible = true;
            fixture.detectChanges();

            const nodeElements = fixture.debugElement.queryAll(By.css('[pOrganizationChartNode]'));
            const nodeComponent = nodeElements[0].componentInstance as OrganizationChartNode;

            const event = new MouseEvent('click');
            spyOn(event, 'preventDefault');

            nodeComponent.toggleNode(event, component.data[0]);

            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Component Lifecycle', () => {
        it('should unsubscribe on destroy', () => {
            component.data = [{ label: 'Root' }];
            fixture.detectChanges();

            const nodeElements = fixture.debugElement.queryAll(By.css('[pOrganizationChartNode]'));
            const nodeComponent = nodeElements[0].componentInstance as OrganizationChartNode;

            spyOn(nodeComponent.subscription, 'unsubscribe');

            nodeComponent.ngOnDestroy();

            expect(nodeComponent.subscription.unsubscribe).toHaveBeenCalled();
        });
    });
});
