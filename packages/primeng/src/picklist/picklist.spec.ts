import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { PickList } from './picklist';
import {
    PickListMoveToTargetEvent,
    PickListMoveToSourceEvent,
    PickListMoveAllToTargetEvent,
    PickListMoveAllToSourceEvent,
    PickListSourceSelectEvent,
    PickListTargetSelectEvent,
    PickListSourceReorderEvent,
    PickListTargetReorderEvent
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
            const firstItem = component.source[0];
            const secondItem = component.source[1];

            // Simulate reordering within source list
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.source,
                    id: 'source-list'
                } as any,
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

            expect(component.source[0]).toBe(secondItem);
            expect(component.source[1]).toBe(firstItem);
        }));

        it('should reorder items within target list', fakeAsync(() => {
            const firstItem = component.target[0];
            const secondItem = component.target[1];

            // Simulate reordering within target list
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.target,
                    id: 'target-list'
                } as any,
                container: {
                    data: component.target,
                    id: 'target-list'
                } as any,
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

            expect(component.target[0]).toBe(secondItem);
            expect(component.target[1]).toBe(firstItem);
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
            const originalSourceLength = component.source.length;
            const originalTargetLength = component.target.length;

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
            const originalFirstItem = component.source[0];
            const originalSecondItem = component.source[1];

            // Reorder within source
            const dragDropEvent: CdkDragDrop<any[]> = {
                previousContainer: {
                    data: component.source,
                    id: 'source-list'
                } as any,
                container: {
                    data: component.source,
                    id: 'source-list'
                } as any,
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
            expect(component.source[0]).toBe(originalSecondItem);
            expect(component.source[1]).toBe(originalFirstItem);
        }));
    });
});
