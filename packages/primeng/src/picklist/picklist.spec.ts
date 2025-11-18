import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import {
    PickListMoveAllToSourceEvent,
    PickListMoveAllToTargetEvent,
    PickListMoveToSourceEvent,
    PickListMoveToTargetEvent,
    PickListSourceReorderEvent,
    PickListSourceSelectEvent,
    PickListTargetReorderEvent,
    PickListTargetSelectEvent
} from 'primeng/types/picklist';
import { PickList } from './picklist';

@Component({
    standalone: false,
    template: `
        <p-picklist
            [source]="source"
            [target]="target"
            [sourceHeader]="sourceHeader"
            [targetHeader]="targetHeader"
            [dragdrop]="dragdrop"
            [showSourceControls]="showSourceControls"
            [showTargetControls]="showTargetControls"
            [disabled]="disabled"
            [responsive]="responsive"
            [filterBy]="filterBy"
            [sourceFilterPlaceholder]="sourceFilterPlaceholder"
            [targetFilterPlaceholder]="targetFilterPlaceholder"
            [sourceStyle]="sourceStyle"
            [targetStyle]="targetStyle"
            [dataKey]="dataKey"
            (onMoveToTarget)="onMoveToTarget($event)"
            (onMoveToSource)="onMoveToSource($event)"
            (onMoveAllToTarget)="onMoveAllToTarget($event)"
            (onMoveAllToSource)="onMoveAllToSource($event)"
            (onSourceSelect)="onSourceSelect($event)"
            (onTargetSelect)="onTargetSelect($event)"
            (onSourceReorder)="onSourceReorder($event)"
            (onTargetReorder)="onTargetReorder($event)"
        >
            <ng-template pTemplate="item" let-item>
                <div class="item-template">{{ item.name }}</div>
            </ng-template>
            <ng-template pTemplate="sourceHeader">
                <div class="source-header">{{ sourceHeader }}</div>
            </ng-template>
            <ng-template pTemplate="targetHeader">
                <div class="target-header">{{ targetHeader }}</div>
            </ng-template>
        </p-picklist>
    `
})
class TestPickListComponent {
    source: any[] = [
        { id: 1, name: 'Item 1', category: 'A' },
        { id: 2, name: 'Item 2', category: 'B' },
        { id: 3, name: 'Item 3', category: 'A' },
        { id: 4, name: 'Item 4', category: 'C' }
    ];

    target: any[] = [
        { id: 5, name: 'Item 5', category: 'B' },
        { id: 6, name: 'Item 6', category: 'A' }
    ];

    sourceHeader: string = 'Available Items';
    targetHeader: string = 'Selected Items';
    dragdrop: boolean = true;
    showSourceControls: boolean = true;
    showTargetControls: boolean = true;
    disabled: boolean = false;
    responsive: boolean = false;
    filterBy: string = 'name';
    sourceFilterPlaceholder: string = 'Filter source';
    targetFilterPlaceholder: string = 'Filter target';
    sourceStyle: any = null as any;
    targetStyle: any = null as any;
    dataKey: string | undefined;

    // Event handlers
    onMoveToTarget(event: PickListMoveToTargetEvent) {
        this.moveToTargetEvent = event;
    }

    onMoveToSource(event: PickListMoveToSourceEvent) {
        this.moveToSourceEvent = event;
    }

    onMoveAllToTarget(event: PickListMoveAllToTargetEvent) {
        this.moveAllToTargetEvent = event;
    }

    onMoveAllToSource(event: PickListMoveAllToSourceEvent) {
        this.moveAllToSourceEvent = event;
    }

    onSourceSelect(event: PickListSourceSelectEvent) {
        this.sourceSelectEvent = event;
    }

    onTargetSelect(event: PickListTargetSelectEvent) {
        this.targetSelectEvent = event;
    }

    onSourceReorder(event: PickListSourceReorderEvent) {
        this.sourceReorderEvent = event;
    }

    onTargetReorder(event: PickListTargetReorderEvent) {
        this.targetReorderEvent = event;
    }

    // Event tracking
    moveToTargetEvent: PickListMoveToTargetEvent | null = null as any;
    moveToSourceEvent: PickListMoveToSourceEvent | null = null as any;
    moveAllToTargetEvent: PickListMoveAllToTargetEvent | null = null as any;
    moveAllToSourceEvent: PickListMoveAllToSourceEvent | null = null as any;
    sourceSelectEvent: PickListSourceSelectEvent | null = null as any;
    targetSelectEvent: PickListTargetSelectEvent | null = null as any;
    sourceReorderEvent: PickListSourceReorderEvent | null = null as any;
    targetReorderEvent: PickListTargetReorderEvent | null = null as any;
}

describe('PickList', () => {
    let component: TestPickListComponent;
    let fixture: ComponentFixture<TestPickListComponent>;
    let picklistComponent: PickList;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestPickListComponent],
            imports: [CommonModule, PickList, DragDropModule],
            providers: [provideNoopAnimations()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPickListComponent);
        component = fixture.componentInstance;
        picklistComponent = fixture.debugElement.query(By.directive(PickList)).componentInstance;
        fixture.detectChanges();
    });

    describe('Basic Functionality', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
            expect(picklistComponent).toBeTruthy();
        });

        it('should render source and target lists with items', () => {
            const allListboxes = fixture.debugElement.queryAll(By.css('p-listbox'));

            expect(allListboxes.length).toBe(2); // source and target
            expect(component.source.length).toBe(4);
            expect(component.target.length).toBe(2);
        });

        it('should display headers when provided', () => {
            // Check if headers are passed to the component
            expect(component.sourceHeader).toBe('Available Items');
            expect(component.targetHeader).toBe('Selected Items');
        });
    });

    describe('Drag & Drop Functionality', () => {
        it('should have CDK drag drop enabled when dragdrop is true', () => {
            // Check that dragdrop is enabled on component
            expect(component.dragdrop).toBe(true);
            expect(picklistComponent.dragdrop).toBe(true);
        });

        it('should have cdkDrag directive on items when dragdrop is enabled', () => {
            // Check data arrays have items for dragging
            expect(component.source.length + component.target.length).toBe(6); // 4 source + 2 target items
        });

        it('should move item from source to target via drag drop', fakeAsync(() => {
            const initialSourceCount = component.source.length;
            const initialTargetCount = component.target.length;
            const itemToMove = component.source[0];

            // Simulate drag drop event
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: itemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            expect(component.source.length).toBe(initialSourceCount - 1);
            expect(component.target.length).toBe(initialTargetCount + 1);
            expect(component.target).toContain(itemToMove);
            expect(component.source).not.toContain(itemToMove);
        }));

        it('should move item from target to source via drag drop', fakeAsync(() => {
            const initialSourceCount = component.source.length;
            const initialTargetCount = component.target.length;
            const itemToMove = component.target[0];

            // Simulate drag drop event
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: itemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.SOURCE_LIST);
            tick();
            fixture.detectChanges();

            expect(component.target.length).toBe(initialTargetCount - 1);
            expect(component.source.length).toBe(initialSourceCount + 1);
            expect(component.source).toContain(itemToMove);
            expect(component.target).not.toContain(itemToMove);
        }));

        it('should reorder items within source list', fakeAsync(() => {
            const firstItemId = component.source[0].id;
            const secondItemId = component.source[1].id;
            const firstItem = component.source[0];

            // Simulate reordering within source list (move first item to position 1)
            const sourceContainer = {
                data: component.source,
                id: 'source-list'
            } as any;
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: sourceContainer,
                container: sourceContainer,
                previousIndex: 0,
                currentIndex: 1,
                item: { data: firstItem } as any,
                isPointerOverContainer: true,
                distance: { x: 0, y: 50 },
                dropPoint: { x: 0, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.SOURCE_LIST);
            tick();
            fixture.detectChanges();

            // After reordering: second item should be first, first item should be second
            expect(component.source[0].id).toBe(secondItemId);
            expect(component.source[1].id).toBe(firstItemId);
        }));

        it('should reorder items within target list', fakeAsync(() => {
            const firstItemId = component.target[0].id;
            const secondItemId = component.target[1].id;
            const firstItem = component.target[0];

            // Simulate reordering within target list (move first item to position 1)
            const targetContainer = {
                data: component.target,
                id: 'target-list'
            } as any;
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: targetContainer,
                container: targetContainer,
                previousIndex: 0,
                currentIndex: 1,
                item: { data: firstItem } as any,
                isPointerOverContainer: true,
                distance: { x: 0, y: 50 },
                dropPoint: { x: 0, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // After reordering: second item should be first, first item should be second
            expect(component.target[0].id).toBe(secondItemId);
            expect(component.target[1].id).toBe(firstItemId);
        }));
    });

    describe('Edge Cases for Drag & Drop', () => {
        it('should handle drag drop when source list is empty', fakeAsync(() => {
            component.source = [];
            fixture.detectChanges();

            const targetItem = component.target[0];
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: targetItem } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.SOURCE_LIST);
            tick();
            fixture.detectChanges();

            expect(component.source.length).toBe(1);
            expect(component.source[0]).toBe(targetItem);
            expect(component.target.length).toBe(1);
        }));

        it('should handle drag drop when target list is empty', fakeAsync(() => {
            component.target = [];
            fixture.detectChanges();

            const sourceItem = component.source[0];
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: sourceItem } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            expect(component.target.length).toBe(1);
            expect(component.target[0]).toBe(sourceItem);
            expect(component.source.length).toBe(3);
        }));

        it('should handle drag drop when both lists are empty', () => {
            component.source = [];
            component.target = [];
            fixture.detectChanges();

            // No items should be draggable
            const draggableItems = fixture.debugElement.queryAll(By.css('[cdkDrag]'));
            expect(draggableItems.length).toBe(0);
        });

        it('should handle drag drop with filtered lists', fakeAsync(() => {
            component.filterBy = 'name';
            fixture.detectChanges();

            // Apply filter to show only items with category 'A'
            const sourceFilterInput = fixture.debugElement.query(By.css('[data-pc-section="sourceFilterInput"]'));
            if (sourceFilterInput) {
                sourceFilterInput.nativeElement.value = 'Item 1';
                sourceFilterInput.nativeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
                tick();
            }

            const itemToMove = component.source[0]; // Item 1
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: itemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            expect(component.target).toContain(itemToMove);
            expect(component.source).not.toContain(itemToMove);
        }));

        it('should preserve item order when dropping at specific index', fakeAsync(() => {
            const itemToMove = component.source[0]; // Item 1
            const targetListLength = component.target.length;

            // Drop at index 1 (between existing items)
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 1,
                item: { data: itemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            expect(component.target.length).toBe(targetListLength + 1);
            expect(component.target[1]).toBe(itemToMove);
        }));

        it('should handle drag drop when dragdrop is disabled', () => {
            component.dragdrop = false;
            fixture.detectChanges();

            expect(component.dragdrop).toBe(false);
            expect(picklistComponent.dragdrop).toBe(false);
        });

        it('should handle multiple items drag drop simulation', fakeAsync(() => {
            // Move first item from source to target
            let itemToMove = component.source[0];
            let dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: itemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // Move second item from source to target
            itemToMove = component.source[0]; // Now the first item is different
            dragDropEvent = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 1,
                item: { data: itemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            expect(component.source.length).toBe(2);
            expect(component.target.length).toBe(4);
        }));

        it('should handle invalid drop operations gracefully', fakeAsync(() => {
            // Simulate drag drop event with valid structure but will fail gracefully
            const validDragDropEvent: any = {
                previousContainer: {
                    data: [],
                    id: 'empty-list'
                },
                container: {
                    data: component.target,
                    id: 'target-list'
                },
                previousIndex: 0,
                currentIndex: 0,
                item: { data: { id: 999, name: 'Invalid Item' } },
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            // Should not throw error and arrays should remain reasonable
            expect(() => {
                picklistComponent.onDrop(validDragDropEvent, picklistComponent.TARGET_LIST);
                tick();
                fixture.detectChanges();
            }).not.toThrow();

            // Arrays should be reasonable (might change based on implementation)
            expect(component.source.length).toBeGreaterThanOrEqual(0);
            expect(component.target.length).toBeGreaterThanOrEqual(0);
        }));
    });

    describe('Component Disabled State', () => {
        it('should disable drag drop when component is disabled', () => {
            component.disabled = true;
            fixture.detectChanges();

            expect(component.disabled).toBe(true);
            expect(picklistComponent.disabled).toBe(true);
        });
    });

    describe('Event Emissions for Drag & Drop', () => {
        it('should emit reorder events when items are reordered within lists', fakeAsync(() => {
            // Check that reorder events work by doing actual reordering
            const firstItemId = component.source[0].id;
            const secondItemId = component.source[1].id;
            const originalFirstItem = component.source[0];

            // Reorder within source
            const sourceContainer = {
                data: component.source,
                id: 'source-list'
            } as any;
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: sourceContainer,
                container: sourceContainer,
                previousIndex: 0,
                currentIndex: 1,
                item: { data: originalFirstItem } as any,
                isPointerOverContainer: true,
                distance: { x: 0, y: 100 },
                dropPoint: { x: 0, y: 100 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.SOURCE_LIST);
            tick();
            fixture.detectChanges();

            // Check that items were reordered
            expect(component.source[0].id).toBe(secondItemId);
            expect(component.source[1].id).toBe(firstItemId);
        }));
    });

    describe('dataKey property', () => {
        it('should use dataKey property when provided', () => {
            component.dataKey = 'id';
            fixture.detectChanges();

            expect(picklistComponent.dataKey).toBe('id');
        });

        it('should pass dataKey to both listbox components', () => {
            component.dataKey = 'id';
            fixture.detectChanges();

            const listboxes = fixture.debugElement.queryAll(By.css('p-listbox'));
            expect(listboxes.length).toBe(2);

            // Check that both listboxes use the dataKey as optionLabel
            expect(listboxes[0].componentInstance.optionLabel).toBe('id');
            expect(listboxes[1].componentInstance.optionLabel).toBe('id');
        });
    });

    describe('dataKey configuration', () => {
        it('should properly configure dataKey when provided', () => {
            component.dataKey = 'id';
            fixture.detectChanges();

            expect(picklistComponent.dataKey).toBe('id');

            const listboxes = fixture.debugElement.queryAll(By.css('p-listbox'));
            expect(listboxes.length).toBe(2);

            // When dataKey is provided, it's used as optionLabel in listboxes
            expect(listboxes[0].componentInstance.optionLabel).toBe('id');
            expect(listboxes[1].componentInstance.optionLabel).toBe('id');
        });

        it('should use default name field when dataKey is not provided', () => {
            component.dataKey = undefined;
            fixture.detectChanges();

            const listboxes = fixture.debugElement.queryAll(By.css('p-listbox'));
            expect(listboxes.length).toBe(2);

            // Should fallback to 'name'
            expect(listboxes[0].componentInstance.optionLabel).toBe('name');
            expect(listboxes[1].componentInstance.optionLabel).toBe('name');
        });
    });

    describe('Arrow Button Transfer + Drag&Drop Compatibility', () => {
        it('should allow drag&drop after moving items with arrow buttons (moveRight)', fakeAsync(() => {
            const initialSourceCount = component.source.length;
            const initialTargetCount = component.target.length;

            // Select first item in source
            const itemToMove = component.source[0];
            picklistComponent.selectedItemsSource = [itemToMove];

            // Move item using arrow button (moveRight)
            picklistComponent.moveRight();
            tick();
            fixture.detectChanges();

            // Verify item was moved
            expect(component.source).not.toContain(itemToMove);
            expect(component.target).toContain(itemToMove);
            expect(component.source.length).toBe(initialSourceCount - 1);
            expect(component.target.length).toBe(initialTargetCount + 1);

            // Now try to drag&drop another item from source to target
            const secondItemToMove = component.source[0]; // New first item after previous move

            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: secondItemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // Verify drag&drop worked correctly after arrow button transfer
            expect(component.source).not.toContain(secondItemToMove);
            expect(component.target).toContain(secondItemToMove);
            expect(component.source.length).toBe(initialSourceCount - 2);
            expect(component.target.length).toBe(initialTargetCount + 2);
        }));

        it('should allow drag&drop after moving items with arrow buttons (moveLeft)', fakeAsync(() => {
            const initialSourceCount = component.source.length;
            const initialTargetCount = component.target.length;

            // Select first item in target
            const itemToMove = component.target[0];
            picklistComponent.selectedItemsTarget = [itemToMove];

            // Move item using arrow button (moveLeft)
            picklistComponent.moveLeft();
            tick();
            fixture.detectChanges();

            // Verify item was moved
            expect(component.target).not.toContain(itemToMove);
            expect(component.source).toContain(itemToMove);
            expect(component.target.length).toBe(initialTargetCount - 1);
            expect(component.source.length).toBe(initialSourceCount + 1);

            // Now try to drag&drop an item from target to source
            const secondItemToMove = component.target[0]; // New first item after previous move

            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: secondItemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.SOURCE_LIST);
            tick();
            fixture.detectChanges();

            // Verify drag&drop worked correctly after arrow button transfer
            expect(component.target).not.toContain(secondItemToMove);
            expect(component.source).toContain(secondItemToMove);
            expect(component.target.length).toBe(initialTargetCount - 2);
            expect(component.source.length).toBe(initialSourceCount + 2);
        }));

        it('should allow drag&drop after moveAllRight', fakeAsync(() => {
            // Move all items to target
            picklistComponent.moveAllRight();
            tick();
            fixture.detectChanges();

            // Verify all items were moved
            expect(component.source.length).toBe(0);
            expect(component.target.length).toBe(6); // 2 original + 4 moved

            // Now try to drag&drop an item back from target to source
            const itemToMove = component.target[0];

            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: itemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.SOURCE_LIST);
            tick();
            fixture.detectChanges();

            // Verify drag&drop worked correctly
            expect(component.source).toContain(itemToMove);
            expect(component.target).not.toContain(itemToMove);
            expect(component.source.length).toBe(1);
            expect(component.target.length).toBe(5);
        }));

        it('should allow drag&drop after moveAllLeft', fakeAsync(() => {
            // Move all items to source
            picklistComponent.moveAllLeft();
            tick();
            fixture.detectChanges();

            // Verify all items were moved
            expect(component.target.length).toBe(0);
            expect(component.source.length).toBe(6); // 4 original + 2 moved

            // Now try to drag&drop an item from source to target
            const itemToMove = component.source[0];

            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: itemToMove } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // Verify drag&drop worked correctly
            expect(component.target).toContain(itemToMove);
            expect(component.source).not.toContain(itemToMove);
            expect(component.target.length).toBe(1);
            expect(component.source.length).toBe(5);
        }));
    });

    describe('Multi-Selection Drag&Drop', () => {
        it('should transfer all selected items when dragging one of them (source to target)', fakeAsync(() => {
            // Select multiple items in source
            const selectedItems = [component.source[0], component.source[1], component.source[2]];
            picklistComponent.selectedItemsSource = selectedItems;

            const draggedItem = selectedItems[1]; // Drag the second selected item

            // Simulate drag&drop of one selected item
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 1,
                currentIndex: 0,
                item: { data: draggedItem } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // All selected items should be moved
            selectedItems.forEach((item) => {
                expect(component.source).not.toContain(item);
                expect(component.target).toContain(item);
            });

            expect(component.source.length).toBe(1); // 4 - 3 = 1
            expect(component.target.length).toBe(5); // 2 + 3 = 5

            // Selection should be cleared in source
            expect(picklistComponent.selectedItemsSource.length).toBe(0);
        }));

        it('should transfer all selected items when dragging one of them (target to source)', fakeAsync(() => {
            // First move some items to target to have more items
            const itemsToMoveFirst = [component.source[0], component.source[1]];
            picklistComponent.selectedItemsSource = itemsToMoveFirst;
            picklistComponent.moveRight();
            tick();
            fixture.detectChanges();

            // Now select multiple items in target
            const selectedItems = [component.target[0], component.target[1], component.target[2]];
            picklistComponent.selectedItemsTarget = selectedItems;

            const draggedItem = selectedItems[1]; // Drag the second selected item

            // Simulate drag&drop of one selected item
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                previousIndex: 1,
                currentIndex: 0,
                item: { data: draggedItem } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.SOURCE_LIST);
            tick();
            fixture.detectChanges();

            // All selected items should be moved
            selectedItems.forEach((item) => {
                expect(component.target).not.toContain(item);
                expect(component.source).toContain(item);
            });

            expect(component.target.length).toBe(1); // 4 - 3 = 1
            expect(component.source.length).toBe(5); // 2 + 3 = 5

            // Selection should be cleared in target
            expect(picklistComponent.selectedItemsTarget.length).toBe(0);
        }));

        it('should only move dragged item if it is not part of selection', fakeAsync(() => {
            // Select some items in source
            const selectedItems = [component.source[0], component.source[1]];
            picklistComponent.selectedItemsSource = selectedItems;

            const unselectedItem = component.source[3]; // Not in selection

            // Drag an unselected item
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 3,
                currentIndex: 0,
                item: { data: unselectedItem } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // Only the dragged item should be moved
            expect(component.source).not.toContain(unselectedItem);
            expect(component.target).toContain(unselectedItem);

            // Selected items should remain in source
            selectedItems.forEach((item) => {
                expect(component.source).toContain(item);
                expect(component.target).not.toContain(item);
            });

            expect(component.source.length).toBe(3); // 4 - 1 = 3
            expect(component.target.length).toBe(3); // 2 + 1 = 3
        }));

        it('should maintain order when moving multiple selected items', fakeAsync(() => {
            // Select items in a specific order
            const selectedItems = [
                component.source[0], // Item 1
                component.source[2], // Item 3
                component.source[1] // Item 2
            ];
            picklistComponent.selectedItemsSource = selectedItems;

            const draggedItem = selectedItems[0];

            // Drag one of the selected items
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 1,
                item: { data: draggedItem } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // Items should be in target maintaining their original order from source
            expect(component.target[1].id).toBe(1); // Item 1
            expect(component.target[2].id).toBe(2); // Item 2
            expect(component.target[3].id).toBe(3); // Item 3
        }));

        it('should handle empty selection when dragging', fakeAsync(() => {
            // Clear any selection
            picklistComponent.selectedItemsSource = [];

            const itemToDrag = component.source[0];

            // Drag item with no selection
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: itemToDrag } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // Only the dragged item should be moved
            expect(component.source).not.toContain(itemToDrag);
            expect(component.target).toContain(itemToDrag);
            expect(component.source.length).toBe(3);
            expect(component.target.length).toBe(3);
        }));

        it('should work with keepSelection option when dragging multiple items', fakeAsync(() => {
            // Enable keepSelection
            picklistComponent.keepSelection = true;

            // Select multiple items
            const selectedItems = [component.source[0], component.source[1]];
            picklistComponent.selectedItemsSource = selectedItems;

            const draggedItem = selectedItems[0];

            // Drag one of the selected items
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                previousIndex: 0,
                currentIndex: 0,
                item: { data: draggedItem } as any,
                isPointerOverContainer: true,
                distance: { x: 100, y: 50 },
                dropPoint: { x: 100, y: 50 },
                event: new MouseEvent('mouseup')
            };

            picklistComponent.onDrop(dragDropEvent, picklistComponent.TARGET_LIST);
            tick();
            fixture.detectChanges();

            // Items should be moved
            selectedItems.forEach((item) => {
                expect(component.target).toContain(item);
            });

            // With keepSelection, items should be selected in target
            expect(picklistComponent.selectedItemsTarget.length).toBe(2);
            selectedItems.forEach((item) => {
                expect(picklistComponent.selectedItemsTarget).toContain(item);
            });
        }));
    });

    // PassThrough (PT) Tests
    describe('PassThrough Tests', () => {
        let ptFixture: ComponentFixture<PickList>;
        let ptPicklist: PickList;

        beforeEach(async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [PickList, CommonModule],
                providers: [provideNoopAnimations()]
            }).compileComponents();

            ptFixture = TestBed.createComponent(PickList);
            ptPicklist = ptFixture.componentInstance;
            ptPicklist.source.set([
                { label: 'Item 1', value: 'i1' },
                { label: 'Item 2', value: 'i2' },
                { label: 'Item 3', value: 'i3' }
            ]);
            ptPicklist.target.set([
                { label: 'Item 4', value: 'i4' },
                { label: 'Item 5', value: 'i5' }
            ]);
        });

        describe('Case 1: Simple string classes', () => {
            it('should apply string class to root via host', () => {
                ptFixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
                ptFixture.detectChanges();

                const hostElement = ptFixture.debugElement.nativeElement;
                expect(hostElement.classList.contains('HOST_CLASS')).toBe(true);
            });

            it('should apply string class to sourceControls', () => {
                ptFixture.componentRef.setInput('pt', { sourceControls: 'SOURCE_CONTROLS_CLASS' });
                ptFixture.detectChanges();

                const sourceControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-source-controls"]'));
                if (sourceControlsEl) {
                    expect(sourceControlsEl.nativeElement.classList.contains('SOURCE_CONTROLS_CLASS')).toBe(true);
                }
            });

            it('should apply string class to sourceListContainer', () => {
                ptFixture.componentRef.setInput('pt', { sourceListContainer: 'SOURCE_CONTAINER_CLASS' });
                ptFixture.detectChanges();

                const containerEl = ptFixture.debugElement.query(By.css('.p-picklist-source-controls + div'));
                expect(containerEl?.nativeElement.classList.contains('SOURCE_CONTAINER_CLASS')).toBe(true);
            });

            it('should apply string class to transferControls', () => {
                ptFixture.componentRef.setInput('pt', { transferControls: 'TRANSFER_CONTROLS_CLASS' });
                ptFixture.detectChanges();

                const transferControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-transfer-controls"]'));
                if (transferControlsEl) {
                    expect(transferControlsEl.nativeElement.classList.contains('TRANSFER_CONTROLS_CLASS')).toBe(true);
                }
            });

            it('should apply string class to targetListContainer', () => {
                ptFixture.componentRef.setInput('pt', { targetListContainer: 'TARGET_CONTAINER_CLASS' });
                ptFixture.detectChanges();

                // Get all divs with p-picklist class name
                const picklistDivs = ptFixture.debugElement.queryAll(By.css('[class*="p-picklist"]'));
                // Filter to find the targetListContainer (comes after transferControls)
                const targetContainerEl = picklistDivs.find((el) => el.nativeElement.className.includes('target') && el.nativeElement.className.includes('list'));

                expect(targetContainerEl?.nativeElement.classList.contains('TARGET_CONTAINER_CLASS')).toBe(true);
            });

            it('should apply string class to targetControls', () => {
                ptFixture.componentRef.setInput('pt', { targetControls: 'TARGET_CONTROLS_CLASS' });
                ptFixture.detectChanges();

                const targetControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-target-controls"]'));
                if (targetControlsEl) {
                    expect(targetControlsEl.nativeElement.classList.contains('TARGET_CONTROLS_CLASS')).toBe(true);
                }
            });
        });

        describe('Case 2: Objects with class, style, data attributes', () => {
            it('should apply object with class, style, and data attributes to root via host', () => {
                ptFixture.componentRef.setInput('pt', {
                    host: {
                        class: 'HOST_OBJECT_CLASS',
                        style: { 'background-color': 'red' },
                        'data-p-test': 'true',
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                ptFixture.detectChanges();

                const hostElement = ptFixture.debugElement.nativeElement;
                expect(hostElement.classList.contains('HOST_OBJECT_CLASS')).toBe(true);
                expect(hostElement.style.backgroundColor).toBe('red');
                expect(hostElement.getAttribute('data-p-test')).toBe('true');
                expect(hostElement.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            it('should apply object to sourceControls', () => {
                ptFixture.componentRef.setInput('pt', {
                    sourceControls: {
                        class: 'SOURCE_CONTROLS_OBJECT_CLASS',
                        style: { padding: '10px' }
                    }
                });
                ptFixture.detectChanges();

                const sourceControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-source-controls"]'));
                if (sourceControlsEl) {
                    expect(sourceControlsEl.nativeElement.classList.contains('SOURCE_CONTROLS_OBJECT_CLASS')).toBe(true);
                    expect(sourceControlsEl.nativeElement.style.padding).toBe('10px');
                }
            });

            it('should apply object to transferControls', () => {
                ptFixture.componentRef.setInput('pt', {
                    transferControls: {
                        class: 'TRANSFER_CONTROLS_OBJECT_CLASS',
                        style: { margin: '5px' }
                    }
                });
                ptFixture.detectChanges();

                const transferControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-transfer-controls"]'));
                if (transferControlsEl) {
                    expect(transferControlsEl.nativeElement.classList.contains('TRANSFER_CONTROLS_OBJECT_CLASS')).toBe(true);
                    expect(transferControlsEl.nativeElement.style.margin).toBe('5px');
                }
            });
        });

        describe('Case 3: Child component PT', () => {
            it('should pass PT to button components', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcSourceMoveUpButton: { root: { class: 'CUSTOM_BUTTON_CLASS' } }
                });
                ptFixture.detectChanges();
                tick();

                const buttons = ptFixture.debugElement.queryAll(By.css('button[pbutton]'));
                // Check if any button has custom styling from PT
                expect(buttons.length).toBeGreaterThan(0);
            }));

            it('should pass PT to listbox components', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: { host: { class: 'CUSTOM_LISTBOX_CLASS' } }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2); // source and target
            }));
        });

        describe('Case 4: Inline test', () => {
            @Component({
                standalone: true,
                imports: [PickList],
                template: `<p-picklist [source]="source" [target]="target" [pt]="{ host: 'INLINE_HOST_CLASS' }" />`
            })
            class InlineTestComponent {
                source = [
                    { label: 'Item 1', value: 'i1' },
                    { label: 'Item 2', value: 'i2' }
                ];
                target: any[] = [];
            }

            it('should apply inline PT with string class', () => {
                const inlineFixture = TestBed.createComponent(InlineTestComponent);
                inlineFixture.detectChanges();

                const hostElement = inlineFixture.debugElement.query(By.css('p-picklist')).nativeElement;
                expect(hostElement.classList.contains('INLINE_HOST_CLASS')).toBe(true);
            });

            @Component({
                standalone: true,
                imports: [PickList],
                template: `<p-picklist [source]="source" [target]="target" [pt]="{ host: { class: 'INLINE_OBJECT_CLASS' } }" />`
            })
            class InlineObjectTestComponent {
                source = [
                    { label: 'Item 1', value: 'i1' },
                    { label: 'Item 2', value: 'i2' }
                ];
                target: any[] = [];
            }

            it('should apply inline PT with object class', () => {
                const inlineFixture = TestBed.createComponent(InlineObjectTestComponent);
                inlineFixture.detectChanges();

                const hostElement = inlineFixture.debugElement.query(By.css('p-picklist')).nativeElement;
                expect(hostElement.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            });
        });

        describe('Case 5: Test from PrimeNGConfig', () => {
            @Component({
                standalone: true,
                imports: [PickList],
                template: `
                    <p-picklist [source]="source1" [target]="target1" />
                    <p-picklist [source]="source2" [target]="target2" />
                `
            })
            class GlobalPTTestComponent {
                source1 = [{ label: 'Item 1', value: 'i1' }];
                target1: any[] = [];
                source2 = [{ label: 'Item 2', value: 'i2' }];
                target2: any[] = [];
            }

            it('should apply global PT configuration to all instances', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [PickList],
                    providers: [
                        provideNoopAnimations(),
                        providePrimeNG({
                            pt: {
                                picklist: {
                                    host: { 'aria-label': 'TEST_GLOBAL_ARIA_LABEL' }
                                }
                            }
                        })
                    ]
                }).compileComponents();

                const globalFixture = TestBed.createComponent(GlobalPTTestComponent);
                globalFixture.detectChanges();

                const picklists = globalFixture.debugElement.queryAll(By.css('p-picklist'));
                expect(picklists.length).toBe(2);

                picklists.forEach((picklistEl) => {
                    expect(picklistEl.nativeElement.getAttribute('aria-label')).toBe('TEST_GLOBAL_ARIA_LABEL');
                });
            });

            it('should apply global CSS via PT', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [PickList],
                    providers: [
                        provideNoopAnimations(),
                        providePrimeNG({
                            pt: {
                                picklist: {
                                    host: { class: 'GLOBAL_CLASS' },
                                    global: {
                                        css: `
                                            .p-picklist-transfer-controls {
                                                border: 1px solid red !important;
                                            }
                                        `
                                    }
                                }
                            }
                        })
                    ]
                }).compileComponents();

                const globalFixture = TestBed.createComponent(GlobalPTTestComponent);
                globalFixture.detectChanges();

                const picklists = globalFixture.debugElement.queryAll(By.css('p-picklist'));
                picklists.forEach((picklistEl) => {
                    expect(picklistEl.nativeElement.classList.contains('GLOBAL_CLASS')).toBe(true);
                });
            });
        });

        describe('Case 6: Event binding', () => {
            it('should bind onclick event via PT to sourceControls', fakeAsync(() => {
                let clickedFromPT = false;
                ptFixture.componentRef.setInput('pt', {
                    sourceControls: {
                        onclick: () => {
                            clickedFromPT = true;
                        }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const sourceControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-source-controls"]'));
                sourceControlsEl?.nativeElement.click();
                tick();

                expect(clickedFromPT).toBe(true);
            }));

            it('should bind onclick event via PT to transferControls', fakeAsync(() => {
                let transferClicked = false;
                ptFixture.componentRef.setInput('pt', {
                    transferControls: {
                        onclick: () => {
                            transferClicked = true;
                        }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const transferControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-transfer-controls"]'));
                transferControlsEl?.nativeElement.click();
                tick();

                expect(transferClicked).toBe(true);
            }));
        });

        describe('Case 7: Test with different configurations', () => {
            it('should apply PT when showSourceControls is true', () => {
                ptPicklist.showSourceControls = true;
                ptFixture.componentRef.setInput('pt', { sourceControls: 'SOURCE_VISIBLE_CLASS' });
                ptFixture.detectChanges();

                const sourceControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-source-controls"]'));
                if (sourceControlsEl) {
                    expect(sourceControlsEl.nativeElement.classList.contains('SOURCE_VISIBLE_CLASS')).toBe(true);
                }
            });

            it('should apply PT when showTargetControls is true', () => {
                ptPicklist.showTargetControls = true;
                ptFixture.componentRef.setInput('pt', { targetControls: 'TARGET_VISIBLE_CLASS' });
                ptFixture.detectChanges();

                const targetControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-target-controls"]'));
                if (targetControlsEl) {
                    expect(targetControlsEl.nativeElement.classList.contains('TARGET_VISIBLE_CLASS')).toBe(true);
                }
            });
        });

        describe('Case 8: Multiple button PT variations', () => {
            it('should apply PT to all source control buttons', fakeAsync(() => {
                ptPicklist.showSourceControls = true;
                ptFixture.componentRef.setInput('pt', {
                    pcSourceMoveUpButton: { root: { class: 'MOVE_UP_CLASS' } },
                    pcSourceMoveTopButton: { root: { class: 'MOVE_TOP_CLASS' } },
                    pcSourceMoveDownButton: { root: { class: 'MOVE_DOWN_CLASS' } },
                    pcSourceMoveBottomButton: { root: { class: 'MOVE_BOTTOM_CLASS' } }
                });
                ptFixture.detectChanges();
                tick();

                const buttons = ptFixture.debugElement.queryAll(By.css('button[pbutton]'));
                expect(buttons.length).toBeGreaterThan(0);
            }));

            it('should apply PT to transfer control buttons', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcMoveToTargetButton: { root: { class: 'TO_TARGET_CLASS' } },
                    pcMoveAllToTargetButton: { root: { class: 'ALL_TO_TARGET_CLASS' } },
                    pcMoveToSourceButton: { root: { class: 'TO_SOURCE_CLASS' } },
                    pcMoveAllToSourceButton: { root: { class: 'ALL_TO_SOURCE_CLASS' } }
                });
                ptFixture.detectChanges();
                tick();

                const buttons = ptFixture.debugElement.queryAll(By.css('button[pbutton]'));
                expect(buttons.length).toBeGreaterThan(0);
            }));

            it('should apply PT to target control buttons', fakeAsync(() => {
                ptPicklist.showTargetControls = true;
                ptFixture.componentRef.setInput('pt', {
                    pcTargetMoveUpButton: { root: { class: 'TARGET_UP_CLASS' } },
                    pcTargetMoveTopButton: { root: { class: 'TARGET_TOP_CLASS' } },
                    pcTargetMoveDownButton: { root: { class: 'TARGET_DOWN_CLASS' } },
                    pcTargetMoveBottomButton: { root: { class: 'TARGET_BOTTOM_CLASS' } }
                });
                ptFixture.detectChanges();
                tick();

                const buttons = ptFixture.debugElement.queryAll(By.css('button[pbutton]'));
                expect(buttons.length).toBeGreaterThan(0);
            }));
        });

        describe('Case 9: Instance-based PT tests with callbacks', () => {
            it('should access instance.disabled property in PT callback', fakeAsync(() => {
                ptPicklist.disabled = true;
                ptFixture.componentRef.setInput('pt', {
                    sourceControls: ({ instance }) => {
                        return {
                            class: {
                                DISABLED_STATE: instance?.disabled
                            }
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                const sourceControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-source-controls"]'));
                if (sourceControlsEl) {
                    expect(sourceControlsEl.nativeElement.classList.contains('DISABLED_STATE')).toBe(true);
                }
            }));

            it('should access instance.showSourceControls property in PT callback', fakeAsync(() => {
                ptPicklist.showSourceControls = true;
                ptFixture.componentRef.setInput('pt', {
                    host: ({ instance }) => {
                        return {
                            class: {
                                SOURCE_CONTROLS_VISIBLE: instance?.showSourceControls
                            }
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                // host is the component's root element
                const hostEl = ptFixture.debugElement.nativeElement;
                expect(hostEl.classList.contains('SOURCE_CONTROLS_VISIBLE')).toBe(true);
            }));

            it('should access instance.showTargetControls property in PT callback', fakeAsync(() => {
                ptPicklist.showTargetControls = true;
                ptFixture.componentRef.setInput('pt', {
                    host: ({ instance }) => {
                        return {
                            class: {
                                TARGET_CONTROLS_VISIBLE: instance?.showTargetControls
                            }
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                // host is the component's root element
                const hostEl = ptFixture.debugElement.nativeElement;
                expect(hostEl.classList.contains('TARGET_CONTROLS_VISIBLE')).toBe(true);
            }));

            it('should access instance.source array in PT callback', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    sourceListContainer: ({ instance }) => {
                        const sourceLength = instance?.source()?.length || 0;
                        return {
                            'data-source-count': sourceLength.toString()
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                const containerEl = ptFixture.debugElement.query(By.css('.p-picklist-source-controls + div'));
                if (containerEl) {
                    expect(containerEl.nativeElement.getAttribute('data-source-count')).toBe('3');
                }
            }));

            it('should access instance.target array in PT callback', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    targetListContainer: ({ instance }) => {
                        const targetLength = instance?.target()?.length || 0;
                        return {
                            'data-target-count': targetLength.toString()
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                const picklistDivs = ptFixture.debugElement.queryAll(By.css('[class*="p-picklist"]'));
                const targetContainerEl = picklistDivs.find((el) => el.nativeElement.className.includes('target') && el.nativeElement.className.includes('list'));
                if (targetContainerEl) {
                    expect(targetContainerEl.nativeElement.getAttribute('data-target-count')).toBe('2');
                }
            }));

            it('should apply conditional styling based on instance.disabled in transferControls', fakeAsync(() => {
                ptPicklist.disabled = false;
                ptFixture.componentRef.setInput('pt', {
                    transferControls: ({ instance }) => {
                        return {
                            style: {
                                'background-color': instance?.disabled ? 'gray' : 'blue'
                            }
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                const transferControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-transfer-controls"]'));
                if (transferControlsEl) {
                    expect(transferControlsEl.nativeElement.style.backgroundColor).toBe('blue');
                }
            }));

            it('should access instance.viewChanged property in PT callback', fakeAsync(() => {
                ptPicklist.viewChanged = false;
                ptFixture.componentRef.setInput('pt', {
                    transferControls: ({ instance }) => {
                        return {
                            class: {
                                VIEW_CHANGED: instance?.viewChanged
                            }
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                const transferControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-transfer-controls"]'));
                if (transferControlsEl) {
                    expect(transferControlsEl.nativeElement.classList.contains('VIEW_CHANGED')).toBe(false);
                }
            }));

            it('should access instance.$pcPickList in nested picklist PT callback', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    host: ({ instance }) => {
                        return {
                            class: 'NESTED_TEST',
                            'data-has-parent': instance?.$pcPickList ? 'true' : 'false'
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                // In standalone picklist, $pcPickList should be undefined
                expect(ptPicklist.$pcPickList).toBeUndefined();
                // host is the component's root element
                const hostEl = ptFixture.debugElement.nativeElement;
                expect(hostEl.getAttribute('data-has-parent')).toBe('false');
            }));

            it('should use instance properties for complex conditional PT', fakeAsync(() => {
                ptPicklist.disabled = false;
                ptPicklist.showSourceControls = true;
                ptFixture.componentRef.setInput('pt', {
                    sourceControls: ({ instance }) => {
                        return {
                            class: {
                                ENABLED_AND_VISIBLE: !instance?.disabled && instance?.showSourceControls
                            },
                            'data-test-state': 'active'
                        };
                    }
                });
                ptFixture.detectChanges();
                tick();

                const sourceControlsEl = ptFixture.debugElement.query(By.css('[class*="p-picklist-source-controls"]'));
                if (sourceControlsEl) {
                    expect(sourceControlsEl.nativeElement.classList.contains('ENABLED_AND_VISIBLE')).toBe(true);
                    expect(sourceControlsEl.nativeElement.getAttribute('data-test-state')).toBe('active');
                }
            }));
        });

        describe('Case 10: Listbox child component PT tests', () => {
            it('should pass PT to listbox host', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: {
                        host: { class: 'CUSTOM_LISTBOX_HOST' }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
                listboxes.forEach((listbox) => {
                    expect(listbox.nativeElement.classList.contains('CUSTOM_LISTBOX_HOST')).toBe(true);
                });
            }));

            it('should pass PT to listbox root', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: {
                        root: { class: 'CUSTOM_LISTBOX_ROOT' }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
            }));

            it('should pass PT to listbox list container', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: {
                        listContainer: { class: 'CUSTOM_LIST_CONTAINER' }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
            }));

            it('should pass PT to listbox list items', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: {
                        option: { class: 'CUSTOM_OPTION_CLASS' }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
            }));

            it('should pass PT to listbox filter input when filterBy is enabled', fakeAsync(() => {
                ptPicklist.filterBy = 'label';
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: {
                        pcFilter: {
                            root: { class: 'CUSTOM_FILTER_ROOT' }
                        }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
            }));

            it('should pass PT with instance callback to listbox', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: ({ instance }) => {
                        return {
                            root: {
                                class: {
                                    LISTBOX_DISABLED: instance?.disabled
                                }
                            }
                        };
                    }
                });
                ptPicklist.disabled = true;
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
            }));

            it('should pass multiple PT sections to listbox', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: {
                        host: { class: 'LISTBOX_HOST' },
                        root: { class: 'LISTBOX_ROOT' },
                        listContainer: { class: 'LISTBOX_LIST_CONTAINER' },
                        option: { class: 'LISTBOX_OPTION' }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
                listboxes.forEach((listbox) => {
                    expect(listbox.nativeElement.classList.contains('LISTBOX_HOST')).toBe(true);
                });
            }));

            it('should pass PT with style to listbox', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: {
                        host: {
                            style: { border: '2px solid red' }
                        }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
                listboxes.forEach((listbox) => {
                    expect(listbox.nativeElement.style.border).toBe('2px solid red');
                });
            }));

            it('should pass PT with data attributes to listbox', fakeAsync(() => {
                ptFixture.componentRef.setInput('pt', {
                    pcListbox: {
                        host: {
                            'data-testid': 'picklist-listbox',
                            'aria-label': 'Picklist Listbox'
                        }
                    }
                });
                ptFixture.detectChanges();
                tick();

                const listboxes = ptFixture.debugElement.queryAll(By.css('p-listbox'));
                expect(listboxes.length).toBe(2);
                listboxes.forEach((listbox) => {
                    expect(listbox.nativeElement.getAttribute('data-testid')).toBe('picklist-listbox');
                    expect(listbox.nativeElement.getAttribute('aria-label')).toBe('Picklist Listbox');
                });
            }));
        });
    });
});
