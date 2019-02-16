import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { PrimeTemplate } from '../common/shared';
import { Dropdown } from '../dropdown/dropdown';
import { Paginator } from '../paginator/paginator';
import { Table, TableBody, ScrollableView, EditableColumn, CellEditor } from './table';

class Car {
    id: number;
    brand: string;
    vin: string;
    year: number;
    color: string;
    notes: string;
}

class CarColumn {
    header: string;
    field: string;
    isDisabled: boolean;
    editType?: 'input' | 'textarea';
}

class EditInitEvent {
    data: any;
    field: string;
}

class EditCompleteEvent {
    data: any;
    field: string;
}

class EditCancelledEvent {
    data: any;
    field: string;
}

@Component({
    template: `
    <p-table [value]="cars" [columns]="columns" (onEditInit)="onEditInit($event)" (onEditComplete)="onEditComplete($event)" (onEditCancel)="onEditCancel($event)">
        <ng-template pTemplate="header" let-cols>
            <tr>
                <th *ngFor="let col of cols">{{col.header}}</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-car let-cols="columns">
            <tr [attr.id]="'car-' + car.id">
                <td [class]="'car-column-' + col.field" [pEditableColumn]="car" [pEditableColumnField]="col.field" [pEditableColumnDisabled]="col.isDisabled" *ngFor="let col of cols">
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <ng-container [ngSwitch]="col.editType">
                                <input type="text" class="cell-value-input" [(ngModel)]="car[col.field]" *ngSwitchCase="'input'" />
                                <textarea class="cell-value-textarea" [(ngModel)]="car[col.field]" *ngSwitchCase="'textarea'"></textarea>
                            </ng-container>
                        </ng-template>
                        <ng-template pTemplate="output">
                            <span class="cell-value-output">{{car[col.field]}}</span>
                        </ng-template>
                    </p-cellEditor>
                </td>
            </tr>
        </ng-template>
    </p-table>
    `
})
class TestTableEditComponent {
    editInitEvent: EditInitEvent;
    editCompleteEvent: EditCompleteEvent;
    editCancelledEvent: EditCancelledEvent;

    cars: Car[] = [
        { id: 1, brand: 'Ford', vin: 'idbeholdr', year: 2000, color: 'maroon', notes: 'This car is slow.' },
        { id: 2, brand: 'Pontiac', vin: 'idbeholds', year: 1997, color: 'black', notes: 'This car is fast.' },
        { id: 3, brand: 'Subaru', vin: 'idbeholdl', year: 2015, color: 'silver', notes: 'This car has all-wheel drive.' }
    ];

    columns: CarColumn[] = [
        { header: 'Brand', field: 'brand', isDisabled: false, editType: 'input' },
        { header: 'Vin', field: 'vin', isDisabled: true },
        { header: 'Year', field: 'year', isDisabled: false, editType: 'input' },
        { header: 'Color', field: 'color', isDisabled: false, editType: 'input' },
        { header: 'Notes', field: 'notes', isDisabled: false, editType: 'textarea' }
    ];

    onEditInit(editInitEvent: EditInitEvent) {
        this.editInitEvent = editInitEvent;
    }

    onEditComplete(editCompleteEvent: EditCompleteEvent) {
        this.editCompleteEvent = editCompleteEvent;
    }

    onEditCancel(editCancelledEvent: EditCancelledEvent) {
        this.editCancelledEvent = editCancelledEvent;
    }
}

describe('Table editing', () => {
    const inputFocusTimeout = 50;
    const editingCellClass = 'ui-editing-cell';

    let testComponentFixture: ComponentFixture<TestTableEditComponent>;
    let testTableEditComponent: TestTableEditComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                TestTableEditComponent,
                PrimeTemplate,
                Dropdown,
                Paginator,
                Table,
                TableBody,
                ScrollableView,
                CellEditor,
                EditableColumn
            ]
        });

        testComponentFixture = TestBed.createComponent(TestTableEditComponent);
        testTableEditComponent = testComponentFixture.componentInstance;
    });

    describe('when the user is not editing the cell', () => {

        it('should display the cell "output" template', () => {
            // Arrange
            const car = testTableEditComponent.cars[1];
            const field = 'brand';
            const expectedCellValue = car[field];

            // Act
            testComponentFixture.detectChanges();
            const cellSelector = `#car-${car.id} .car-column-${field}`;
            const cellDebugElement = testComponentFixture.debugElement.query(By.css(cellSelector));
            const cellValueDebugElement = cellDebugElement.query(By.css('.cell-value-output'));

            // Assert
            expect(cellValueDebugElement).toBeTruthy();
            expect(cellValueDebugElement.nativeElement.textContent).toBe(expectedCellValue);
            expect(cellDebugElement.nativeElement.classList).not.toContain(editingCellClass);
        });
    });

    describe('when the user clicks on a cell', () => {

        describe('when editing the column is disabled', () => {

            it('should display the cell "output" template and not emit an "onEditInit" event', () => {
                // Arrange
                const car = testTableEditComponent.cars[2];
                const field = 'vin';
                const expectedCellValue = car[field];

                testComponentFixture.detectChanges();
                const cellEditorSelector = `#car-${car.id} .car-column-${field} p-cellEditor`;
                const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                // Act
                cellEditorDebugElement.nativeElement.click();
                testComponentFixture.detectChanges();

                const cellSelector = `#car-${car.id} .car-column-${field}`;
                const cellDebugElement = testComponentFixture.debugElement.query(By.css(cellSelector));
                const cellValueDebugElement = cellDebugElement.query(By.css('.cell-value-output'));

                // Assert
                expect(cellValueDebugElement).toBeTruthy();
                expect(cellValueDebugElement.nativeElement.textContent).toBe(expectedCellValue);
                expect(cellDebugElement.nativeElement.classList).not.toContain(editingCellClass);
                expect(testTableEditComponent.editInitEvent).toBeUndefined();
            });
        });

        describe('when editing the column is enabled', () => {

            it('should display the cell "input" template and emit an "onEditInit" event', () => {
                // Arrange
                const car = testTableEditComponent.cars[2];
                const column = testTableEditComponent.columns[3];

                const expectedEditInitEvent: EditInitEvent = {
                    data: car,
                    field: column.field
                };

                testComponentFixture.detectChanges();
                const cellEditorSelector = `#car-${car.id} .car-column-${column.field} p-cellEditor`;
                const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                // Act
                cellEditorDebugElement.nativeElement.click();
                testComponentFixture.detectChanges();

                const cellSelector = `#car-${car.id} .car-column-${column.field}`;
                const cellDebugElement = testComponentFixture.debugElement.query(By.css(cellSelector));
                const cellInputDebugElement = cellDebugElement.query(By.css('.cell-value-input'));

                // Assert
                expect(cellInputDebugElement).toBeTruthy();
                expect(cellDebugElement.nativeElement.classList).toContain(editingCellClass);
                expect(testTableEditComponent.editInitEvent).toEqual(expectedEditInitEvent);
            });
        });

        describe('when the cell "input" template contains an "input" element', () => {

            it('should display the cell "input" template and focus the "input" element', fakeAsync(() => {
                // Arrange
                const car = testTableEditComponent.cars[0];
                const field = 'year';
                const expectedCellValue = car[field];

                testComponentFixture.detectChanges();
                const cellEditorSelector = `#car-${car.id} .car-column-${field} p-cellEditor`;
                const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                // Act
                cellEditorDebugElement.nativeElement.click();
                testComponentFixture.detectChanges();

                const cellSelector = `#car-${car.id} .car-column-${field}`;
                const cellDebugElement = testComponentFixture.debugElement.query(By.css(cellSelector));
                const cellInputDebugElement = cellDebugElement.query(By.css('.cell-value-input'));
                const cellInputInstance = cellInputDebugElement.injector.get(NgModel);

                tick(inputFocusTimeout);
                const activeElement = document.activeElement;

                // Assert
                expect(cellInputDebugElement).toBeTruthy();
                expect(cellInputInstance.value).toBe(expectedCellValue);
                expect(cellDebugElement.nativeElement.classList).toContain(editingCellClass);
                expect(activeElement).toBe(cellInputDebugElement.nativeElement);
            }));
        });

        describe('when the cell "input" template contains a "textarea" element', () => {

            it('should display the cell "input" template and focus the "textarea" element', fakeAsync(() => {
                // Arrange
                const car = testTableEditComponent.cars[0];
                const field = 'notes';
                const expectedCellValue = car[field];

                testComponentFixture.detectChanges();
                const cellEditorSelector = `#car-${car.id} .car-column-${field} p-cellEditor`;
                const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                // Act
                cellEditorDebugElement.nativeElement.click();
                testComponentFixture.detectChanges();

                const cellSelector = `#car-${car.id} .car-column-${field}`;
                const cellDebugElement = testComponentFixture.debugElement.query(By.css(cellSelector));
                const cellTextAreaDebugElement = cellDebugElement.query(By.css('.cell-value-textarea'));
                const cellTextAreaInstance = cellTextAreaDebugElement.injector.get(NgModel);

                tick(inputFocusTimeout);
                const activeElement = document.activeElement;

                // Assert
                expect(cellTextAreaDebugElement).toBeTruthy();
                expect(cellTextAreaInstance.value).toBe(expectedCellValue);
                expect(cellDebugElement.nativeElement.classList).toContain(editingCellClass);
                expect(activeElement).toBe(cellTextAreaDebugElement.nativeElement);
            }));
        });
    });

    describe('when the user is editing a cell', () => {

        describe('when the user presses the "Enter" key', () => {

            it('should switch to the cell "output" template and emit an "onEditComplete" event', () => {
                // Arrange
                const car = testTableEditComponent.cars[0];
                const column = testTableEditComponent.columns[3];
                const expectedCellValue = car[column.field];

                const expectedEditCompleteEvent: EditCompleteEvent = {
                    data: car,
                    field: column.field
                };

                testComponentFixture.detectChanges();
                const cellEditorSelector = `#car-${car.id} .car-column-${column.field} p-cellEditor`;
                const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                cellEditorDebugElement.nativeElement.click();
                testComponentFixture.detectChanges();

                // Act
                const enterKeyDownEvent: any = document.createEvent('Event');
                enterKeyDownEvent.initEvent('keydown', true, false);
                enterKeyDownEvent.keyCode = 13;

                cellEditorDebugElement.nativeElement.dispatchEvent(enterKeyDownEvent);
                testComponentFixture.detectChanges();

                const cellSelector = `#car-${car.id} .car-column-${column.field}`;
                const cellDebugElement = testComponentFixture.debugElement.query(By.css(cellSelector));
                const cellValueDebugElement = cellDebugElement.query(By.css('.cell-value-output'));

                // Assert
                expect(cellValueDebugElement).toBeTruthy();
                expect(cellValueDebugElement.nativeElement.textContent).toBe(expectedCellValue);
                expect(cellDebugElement.nativeElement.classList).not.toContain(editingCellClass);
                expect(testTableEditComponent.editCompleteEvent).toEqual(expectedEditCompleteEvent);
            });
        });

        describe('when the user presses the "Escape" key', () => {

            it('should switch to the cell "output" template and emit an "onEditCancel" event', () => {
                // Arrange
                const car = testTableEditComponent.cars[2];
                const column = testTableEditComponent.columns[3];
                const expectedCellValue = car[column.field];

                const expectedEditCancelledEvent: EditCancelledEvent = {
                    data: car,
                    field: column.field
                };

                testComponentFixture.detectChanges();
                const cellEditorSelector = `#car-${car.id} .car-column-${column.field} p-cellEditor`;
                const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                cellEditorDebugElement.nativeElement.click();
                testComponentFixture.detectChanges();

                // Act
                const escapeKeyDownEvent: any = document.createEvent('Event');
                escapeKeyDownEvent.initEvent('keydown', true, false);
                escapeKeyDownEvent.keyCode = 27;

                cellEditorDebugElement.nativeElement.dispatchEvent(escapeKeyDownEvent);
                testComponentFixture.detectChanges();

                const cellSelector = `#car-${car.id} .car-column-${column.field}`;
                const cellDebugElement = testComponentFixture.debugElement.query(By.css(cellSelector));
                const cellValueDebugElement = cellDebugElement.query(By.css('.cell-value-output'));

                // Assert
                expect(cellValueDebugElement).toBeTruthy();
                expect(cellValueDebugElement.nativeElement.textContent).toBe(expectedCellValue);
                expect(cellDebugElement.nativeElement.classList).not.toContain(editingCellClass);
                expect(testTableEditComponent.editCancelledEvent).toEqual(expectedEditCancelledEvent);
            });
        });

        describe('when the user presses the "Tab" key', () => {

            it('should emit an "onEditComplete" event', () => {
                // Arrange
                const car = testTableEditComponent.cars[0];
                const column = testTableEditComponent.columns[0];

                const expectedEditCompleteEvent: EditCompleteEvent = {
                    data: car,
                    field: column.field
                };

                testComponentFixture.detectChanges();
                const originalCellSelector = `#car-${car.id} .car-column-${column.field}`;
                const cellEditorSelector = `${originalCellSelector} p-cellEditor`;
                const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                cellEditorDebugElement.nativeElement.click();
                testComponentFixture.detectChanges();

                // Act
                const tabKeyDownEvent: any = document.createEvent('Event');
                tabKeyDownEvent.initEvent('keydown', true, false);
                tabKeyDownEvent.keyCode = 9;
                tabKeyDownEvent.shiftKey = false;

                cellEditorDebugElement.nativeElement.dispatchEvent(tabKeyDownEvent);

                // Assert
                expect(testTableEditComponent.editCompleteEvent).toEqual(expectedEditCompleteEvent);
            });

            describe('and the user is not holding the "Shift" key', () => {

                describe('and there is an editable column to the right of the selected cell', () => {

                    it('should switch the next editable cell to its "input" template', fakeAsync(() => {
                        // Arrange
                        const car = testTableEditComponent.cars[2];
                        const field = 'color';
                        const expectedField = 'notes';
                        const expectedCellValue = car[expectedField];

                        testComponentFixture.detectChanges();
                        const originalCellSelector = `#car-${car.id} .car-column-${field}`;
                        const cellEditorSelector = `${originalCellSelector} p-cellEditor`;
                        const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                        cellEditorDebugElement.nativeElement.click();
                        testComponentFixture.detectChanges();

                        // Act
                        const tabKeyDownEvent: any = document.createEvent('Event');
                        tabKeyDownEvent.initEvent('keydown', true, false);
                        tabKeyDownEvent.keyCode = 9;
                        tabKeyDownEvent.shiftKey = false;

                        cellEditorDebugElement.nativeElement.dispatchEvent(tabKeyDownEvent);
                        testComponentFixture.detectChanges();

                        const expectedCellSelector = `#car-${car.id} .car-column-${expectedField}`;
                        const expectedCellDebugElement = testComponentFixture.debugElement.query(By.css(expectedCellSelector));
                        const expectedCellTextAreaDebugElement = expectedCellDebugElement.query(By.css('.cell-value-textarea'));
                        const expectedCellTextAreaInstance = expectedCellTextAreaDebugElement.injector.get(NgModel);
                        const originalCellDebugElement = testComponentFixture.debugElement.query(By.css(originalCellSelector));

                        tick(inputFocusTimeout);
                        const activeElement = document.activeElement;

                        // Assert
                        expect(expectedCellTextAreaDebugElement).toBeTruthy();
                        expect(expectedCellTextAreaInstance.value).toBe(expectedCellValue);
                        expect(expectedCellDebugElement.nativeElement.classList).toContain(editingCellClass);
                        expect(activeElement).toBe(expectedCellTextAreaDebugElement.nativeElement);
                        expect(originalCellDebugElement.nativeElement.classList).not.toContain(editingCellClass);
                    }));
                });

                describe('and the selected cell is in the last editable column', () => {

                    it('should switch the first editable cell on the next row to its "input" template', fakeAsync(() => {
                        // Arrange
                        const car = testTableEditComponent.cars[0];
                        const field = 'notes';

                        const expectedCar = testTableEditComponent.cars[1];
                        const expectedField = 'brand';
                        const expectedCellValue = expectedCar[expectedField];

                        testComponentFixture.detectChanges();
                        const originalCellSelector = `#car-${car.id} .car-column-${field}`;
                        const cellEditorSelector = `${originalCellSelector} p-cellEditor`;
                        const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                        cellEditorDebugElement.nativeElement.click();
                        testComponentFixture.detectChanges();

                        // Act
                        const tabKeyDownEvent: any = document.createEvent('Event');
                        tabKeyDownEvent.initEvent('keydown', true, false);
                        tabKeyDownEvent.keyCode = 9;
                        tabKeyDownEvent.shiftKey = false;

                        cellEditorDebugElement.nativeElement.dispatchEvent(tabKeyDownEvent);
                        testComponentFixture.detectChanges();

                        const expectedCellSelector = `#car-${expectedCar.id} .car-column-${expectedField}`;
                        const expectedCellDebugElement = testComponentFixture.debugElement.query(By.css(expectedCellSelector));
                        const expectedCellInputDebugElement = expectedCellDebugElement.query(By.css('.cell-value-input'));
                        const expectedCellInputInstance = expectedCellInputDebugElement.injector.get(NgModel);
                        const originalCellDebugElement = testComponentFixture.debugElement.query(By.css(originalCellSelector));

                        tick(inputFocusTimeout);
                        const activeElement = document.activeElement;

                        // Assert
                        expect(expectedCellInputDebugElement).toBeTruthy();
                        expect(expectedCellInputInstance.value).toBe(expectedCellValue);
                        expect(expectedCellDebugElement.nativeElement.classList).toContain(editingCellClass);
                        expect(activeElement).toBe(expectedCellInputDebugElement.nativeElement);
                        expect(originalCellDebugElement.nativeElement.classList).not.toContain(editingCellClass);
                    }));
                });
            });

            describe('and the user is holding the "Shift" key', () => {

                describe('and there is an editable column to the left of the selected cell', () => {

                    it('should switch the previous editable cell to its "input" template', fakeAsync(() => {
                        // Arrange
                        const car = testTableEditComponent.cars[1];
                        const field = 'year';
                        const expectedField = 'brand';
                        const expectedCellValue = car[expectedField];

                        testComponentFixture.detectChanges();
                        const originalCellSelector = `#car-${car.id} .car-column-${field}`;
                        const cellEditorSelector = `${originalCellSelector} p-cellEditor`;
                        const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                        cellEditorDebugElement.nativeElement.click();
                        testComponentFixture.detectChanges();

                        // Act
                        const tabKeyDownEvent: any = document.createEvent('Event');
                        tabKeyDownEvent.initEvent('keydown', true, false);
                        tabKeyDownEvent.keyCode = 9;
                        tabKeyDownEvent.shiftKey = true;

                        cellEditorDebugElement.nativeElement.dispatchEvent(tabKeyDownEvent);
                        testComponentFixture.detectChanges();

                        const expectedCellSelector = `#car-${car.id} .car-column-${expectedField}`;
                        const expectedCellDebugElement = testComponentFixture.debugElement.query(By.css(expectedCellSelector));
                        const expectedCellInputDebugElement = expectedCellDebugElement.query(By.css('.cell-value-input'));
                        const expectedCellInputInstance = expectedCellInputDebugElement.injector.get(NgModel);
                        const originalCellDebugElement = testComponentFixture.debugElement.query(By.css(originalCellSelector));

                        tick(inputFocusTimeout);
                        const activeElement = document.activeElement;

                        // Assert
                        expect(expectedCellInputDebugElement).toBeTruthy();
                        expect(expectedCellInputInstance.value).toBe(expectedCellValue);
                        expect(expectedCellDebugElement.nativeElement.classList).toContain(editingCellClass);
                        expect(activeElement).toBe(expectedCellInputDebugElement.nativeElement);
                        expect(originalCellDebugElement.nativeElement.classList).not.toContain(editingCellClass);
                    }));
                });

                describe('and the selected cell is in the first editable column', () => {

                    it('should switch the last editable cell on the previous row to its "input" template', fakeAsync(() => {
                        // Arrange
                        const car = testTableEditComponent.cars[1];
                        const field = 'brand';

                        const expectedCar = testTableEditComponent.cars[0];
                        const expectedField = 'notes';
                        const expectedCellValue = expectedCar[expectedField];

                        testComponentFixture.detectChanges();
                        const originalCellSelector = `#car-${car.id} .car-column-${field}`;
                        const cellEditorSelector = `${originalCellSelector} p-cellEditor`;
                        const cellEditorDebugElement = testComponentFixture.debugElement.query(By.css(cellEditorSelector));

                        cellEditorDebugElement.nativeElement.click();
                        testComponentFixture.detectChanges();

                        // Act
                        const tabKeyDownEvent: any = document.createEvent('Event');
                        tabKeyDownEvent.initEvent('keydown', true, false);
                        tabKeyDownEvent.keyCode = 9;
                        tabKeyDownEvent.shiftKey = true;

                        cellEditorDebugElement.nativeElement.dispatchEvent(tabKeyDownEvent);
                        testComponentFixture.detectChanges();

                        const expectedCellSelector = `#car-${expectedCar.id} .car-column-${expectedField}`;
                        const expectedCellDebugElement = testComponentFixture.debugElement.query(By.css(expectedCellSelector));
                        const expectedCellTextAreaDebugElement = expectedCellDebugElement.query(By.css('.cell-value-textarea'));
                        const expectedCellTextAreaInstance = expectedCellTextAreaDebugElement.injector.get(NgModel);
                        const originalCellDebugElement = testComponentFixture.debugElement.query(By.css(originalCellSelector));

                        tick(inputFocusTimeout);
                        const activeElement = document.activeElement;

                        // Assert
                        expect(expectedCellTextAreaDebugElement).toBeTruthy();
                        expect(expectedCellTextAreaInstance.value).toBe(expectedCellValue);
                        expect(expectedCellDebugElement.nativeElement.classList).toContain(editingCellClass);
                        expect(activeElement).toBe(expectedCellTextAreaDebugElement.nativeElement);
                        expect(originalCellDebugElement.nativeElement.classList).not.toContain(editingCellClass);
                    }));
                });
            });
        });
    });
});
