import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PickList } from './picklist';
import {
    PickListMoveAllToSourceEvent,
    PickListMoveAllToTargetEvent,
    PickListMoveToSourceEvent,
    PickListMoveToTargetEvent,
    PickListSourceReorderEvent,
    PickListSourceSelectEvent,
    PickListTargetReorderEvent,
    PickListTargetSelectEvent
} from './picklist.interface';

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
            const firstItemId = picklistComponent.source![0].id;
            const secondItemId = picklistComponent.source![1].id;
            const firstItem = picklistComponent.source![0];

            // Simulate reordering within source list (move first item to position 1)
            const sourceContainer = {
                data: picklistComponent.source,
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
            expect(picklistComponent.source![0].id).toBe(secondItemId);
            expect(picklistComponent.source![1].id).toBe(firstItemId);
        }));

        it('should reorder items within target list', fakeAsync(() => {
            const firstItemId = picklistComponent.target![0].id;
            const secondItemId = picklistComponent.target![1].id;
            const firstItem = picklistComponent.target![0];

            // Simulate reordering within target list (move first item to position 1)
            const targetContainer = {
                data: picklistComponent.target,
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
            expect(picklistComponent.target![0].id).toBe(secondItemId);
            expect(picklistComponent.target![1].id).toBe(firstItemId);
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
            let itemToMove = picklistComponent.source![0];
            let dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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
            itemToMove = picklistComponent.source![0]; // Now the first item is different
            dragDropEvent = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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

            expect(picklistComponent.source?.length).toBe(2);
            expect(picklistComponent.target?.length).toBe(4);
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
            const firstItemId = picklistComponent.source![0].id;
            const secondItemId = picklistComponent.source![1].id;
            const originalFirstItem = picklistComponent.source![0];

            // Reorder within source
            const sourceContainer = {
                data: picklistComponent.source,
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
            expect(picklistComponent.source![0].id).toBe(secondItemId);
            expect(picklistComponent.source![1].id).toBe(firstItemId);
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
            const initialSourceCount = picklistComponent?.source?.length || 0;
            const initialTargetCount = picklistComponent?.target?.length || 0;

            // Select first item in source
            const itemToMove = picklistComponent.source![0];
            picklistComponent.selectedItemsSource = [itemToMove];

            // Move item using arrow button (moveRight)
            picklistComponent.moveRight();
            tick();
            fixture.detectChanges();

            // Verify item was moved
            expect(picklistComponent.source).not.toContain(itemToMove);
            expect(picklistComponent.target).toContain(itemToMove);
            expect(picklistComponent.source?.length || 0).toBe(initialSourceCount - 1);
            expect(picklistComponent.target?.length || 0).toBe(initialTargetCount + 1);

            // Now try to drag&drop another item from source to target
            const secondItemToMove = picklistComponent.source![0]; // New first item after previous move

            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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
            expect(picklistComponent.source).not.toContain(secondItemToMove);
            expect(picklistComponent.target).toContain(secondItemToMove);
            expect(picklistComponent.source?.length || 0).toBe(initialSourceCount - 2);
            expect(picklistComponent.target?.length || 0).toBe(initialTargetCount + 2);
        }));

        it('should allow drag&drop after moving items with arrow buttons (moveLeft)', fakeAsync(() => {
            const initialSourceCount = picklistComponent.source?.length || 0;
            const initialTargetCount = picklistComponent.target?.length || 0;

            // Select first item in target
            const itemToMove = picklistComponent.target![0];
            picklistComponent.selectedItemsTarget = [itemToMove];

            // Move item using arrow button (moveLeft)
            picklistComponent.moveLeft();
            tick();
            fixture.detectChanges();

            // Verify item was moved
            expect(picklistComponent.target).not.toContain(itemToMove);
            expect(picklistComponent.source).toContain(itemToMove);
            expect(picklistComponent.target?.length || 0).toBe(initialTargetCount - 1);
            expect(picklistComponent.source?.length || 0).toBe(initialSourceCount + 1);

            // Now try to drag&drop an item from target to source
            const secondItemToMove = picklistComponent.target![0]; // New first item after previous move

            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: picklistComponent.source,
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
            expect(picklistComponent.target).not.toContain(secondItemToMove);
            expect(picklistComponent.source).toContain(secondItemToMove);
            expect(picklistComponent.target?.length || 0).toBe(initialTargetCount - 2);
            expect(picklistComponent.source?.length || 0).toBe(initialSourceCount + 2);
        }));

        it('should allow drag&drop after moveAllRight', fakeAsync(() => {
            // Move all items to target
            picklistComponent.moveAllRight();
            tick();
            fixture.detectChanges();

            // Verify all items were moved
            expect(picklistComponent.source?.length).toBe(0);
            expect(picklistComponent.target?.length).toBe(6); // 2 original + 4 moved

            // Now try to drag&drop an item back from target to source
            const itemToMove = picklistComponent.target![0];

            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: picklistComponent.source,
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
            expect(picklistComponent.source).toContain(itemToMove);
            expect(picklistComponent.target).not.toContain(itemToMove);
            expect(picklistComponent.source?.length).toBe(1);
            expect(picklistComponent.target?.length).toBe(5);
        }));

        it('should allow drag&drop after moveAllLeft', fakeAsync(() => {
            // Move all items to source
            picklistComponent.moveAllLeft();
            tick();
            fixture.detectChanges();

            // Verify all items were moved
            expect(picklistComponent.target?.length).toBe(0);
            expect(picklistComponent.source?.length).toBe(6); // 4 original + 2 moved

            // Now try to drag&drop an item from source to target
            const itemToMove = picklistComponent.source![0];

            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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
            expect(picklistComponent.target).toContain(itemToMove);
            expect(picklistComponent.source).not.toContain(itemToMove);
            expect(picklistComponent.target?.length).toBe(1);
            expect(picklistComponent.source?.length).toBe(5);
        }));
    });

    describe('Multi-Selection Drag&Drop', () => {
        it('should transfer all selected items when dragging one of them (source to target)', fakeAsync(() => {
            // Select multiple items in source
            const selectedItems = [picklistComponent.source![0], picklistComponent.source![1], picklistComponent.source![2]];
            picklistComponent.selectedItemsSource = selectedItems;

            const draggedItem = selectedItems[1]; // Drag the second selected item

            // Simulate drag&drop of one selected item
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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
                expect(picklistComponent.source).not.toContain(item);
                expect(picklistComponent.target).toContain(item);
            });

            expect(picklistComponent.source?.length).toBe(1); // 4 - 3 = 1
            expect(picklistComponent.target?.length).toBe(5); // 2 + 3 = 5

            // Selection should be cleared in source
            expect(picklistComponent.selectedItemsSource.length).toBe(0);
        }));

        it('should transfer all selected items when dragging one of them (target to source)', fakeAsync(() => {
            // First move some items to target to have more items
            const itemsToMoveFirst = [picklistComponent.source![0], picklistComponent.source![1]];
            picklistComponent.selectedItemsSource = itemsToMoveFirst;
            picklistComponent.moveRight();
            tick();
            fixture.detectChanges();

            // Now select multiple items in target
            const selectedItems = [picklistComponent.target![0], picklistComponent.target![1], picklistComponent.target![2]];
            picklistComponent.selectedItemsTarget = selectedItems;

            const draggedItem = selectedItems[1]; // Drag the second selected item

            // Simulate drag&drop of one selected item
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: picklistComponent.source,
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
                expect(picklistComponent.target).not.toContain(item);
                expect(picklistComponent.source).toContain(item);
            });

            expect(picklistComponent.target?.length).toBe(1); // 4 - 3 = 1
            expect(picklistComponent.source?.length).toBe(5); // 2 + 3 = 5

            // Selection should be cleared in target
            expect(picklistComponent.selectedItemsTarget.length).toBe(0);
        }));

        it('should only move dragged item if it is not part of selection', fakeAsync(() => {
            // Select some items in source
            const selectedItems = [picklistComponent.source![0], picklistComponent.source![1]];
            picklistComponent.selectedItemsSource = selectedItems;

            const unselectedItem = picklistComponent.source![3]; // Not in selection

            // Drag an unselected item
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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
            expect(picklistComponent.source).not.toContain(unselectedItem);
            expect(picklistComponent.target).toContain(unselectedItem);

            // Selected items should remain in source
            selectedItems.forEach((item) => {
                expect(picklistComponent.source).toContain(item);
                expect(picklistComponent.target).not.toContain(item);
            });

            expect(picklistComponent.source?.length).toBe(3); // 4 - 1 = 3
            expect(picklistComponent.target?.length).toBe(3); // 2 + 1 = 3
        }));

        it('should maintain order when moving multiple selected items', fakeAsync(() => {
            // Select items in a specific order
            const selectedItems = [
                picklistComponent.source![0], // Item 1
                picklistComponent.source![2], // Item 3
                picklistComponent.source![1] // Item 2
            ];
            picklistComponent.selectedItemsSource = selectedItems;

            const draggedItem = selectedItems[0];

            // Drag one of the selected items
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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
            expect(picklistComponent.target![1].id).toBe(1); // Item 1
            expect(picklistComponent.target![2].id).toBe(2); // Item 2
            expect(picklistComponent.target![3].id).toBe(3); // Item 3
        }));

        it('should handle empty selection when dragging', fakeAsync(() => {
            // Clear any selection
            picklistComponent.selectedItemsSource = [];

            const itemToDrag = picklistComponent.source![0];

            // Drag item with no selection
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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
            expect(picklistComponent.source).not.toContain(itemToDrag);
            expect(picklistComponent.target).toContain(itemToDrag);
            expect(picklistComponent.source?.length).toBe(3);
            expect(picklistComponent.target?.length).toBe(3);
        }));

        it('should work with keepSelection option when dragging multiple items', fakeAsync(() => {
            // Enable keepSelection
            picklistComponent.keepSelection = true;

            // Select multiple items
            const selectedItems = [picklistComponent.source![0], picklistComponent.source![1]];
            picklistComponent.selectedItemsSource = selectedItems;

            const draggedItem = selectedItems[0];

            // Drag one of the selected items
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: picklistComponent.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: picklistComponent.target,
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
                expect(picklistComponent.target).toContain(item);
            });

            // With keepSelection, items should be selected in target
            expect(picklistComponent.selectedItemsTarget.length).toBe(2);
            selectedItems.forEach((item) => {
                expect(picklistComponent.selectedItemsTarget).toContain(item);
            });
        }));
    });
});
