import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickList } from './picklist';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { PickListSourceSelectEvent, PickListTargetSelectEvent } from './picklist.interface';

@Component({
    imports: [PickList],
    template: ` <p-pickList [source]="source" [target]="target">
        <ng-template #item let-item>
            {{ item.name }}
        </ng-template>
    </p-pickList>`
})
class TestPickListComponent {
    source: any[];
    target: any[];

    ngOnInit() {
        this.source = [
            {
                name: 'Item A'
            },
            {
                name: 'Item B'
            }
        ];
        this.target = [
            {
                name: 'Item C'
            }
        ];
    }
}

describe('PickList', () => {
    let component: PickList;
    let fixture: ComponentFixture<TestPickListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule]
        });
        fixture = TestBed.createComponent(TestPickListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('selection', () => {
        it('should emit onSourceSelect on mouse click', async () => {
            const item = fixture.debugElement.query(By.css('.p-picklist-source-list-container .p-listbox-option')).nativeElement as HTMLElement;

            let event: PickListSourceSelectEvent;
            component.onSourceSelect.subscribe((e) => (event = e));

            item.click();

            expect(event.items).toEqual([{ name: 'Item A' }]);
        });

        it('should emit onSourceSelect on space key', async () => {
            const item = fixture.debugElement.query(By.css('.p-picklist-source-list-container .p-listbox-option')).nativeElement as HTMLElement;
            item.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true })); // focus first element

            let event: PickListSourceSelectEvent;
            component.onSourceSelect.subscribe((e) => (event = e));

            item.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));

            expect(event.items).toEqual([{ name: 'Item A' }]);
        });

        it('should emit onTargetSelect on mouse click', async () => {
            const item = fixture.debugElement.query(By.css('.p-picklist-target-list-container .p-listbox-option')).nativeElement as HTMLElement;

            let event: PickListTargetSelectEvent;
            component.onTargetSelect.subscribe((e) => (event = e));

            item.click();

            expect(event.items).toEqual([{ name: 'Item C' }]);
        });

        it('should emit onTargetSelect on space key', async () => {
            const item = fixture.debugElement.query(By.css('.p-picklist-target-list-container .p-listbox-option')).nativeElement as HTMLElement;
            item.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true })); // focus first element

            let event: PickListTargetSelectEvent;
            component.onTargetSelect.subscribe((e) => (event = e));

            item.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));

            expect(event.items).toEqual([{ name: 'Item C' }]);
        });
    });
});
