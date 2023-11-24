import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'dialog-position-demo',
    template: `
        <app-docsectiontext>
            <p>The <i>position</i> property is used to display a Dialog at all edges and corners of the screen.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-2">
            <div class="flex flex-wrap gap-2">
                <p-button (click)="showDialog('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
                <p-button (click)="showDialog('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
            </div>
            <div class="flex flex-wrap gap-2">
                <p-button (click)="showDialog('top-left')" icon="pi pi-arrow-down-right" label="TopLeft" styleClass="p-button-warning"></p-button>
                <p-button (click)="showDialog('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
                <p-button (click)="showDialog('top-right')" icon="pi pi-arrow-down-left" label="TopRight" styleClass="p-button-warning"></p-button>
            </div>
            <div class="flex flex-wrap gap-2">
                <p-button (click)="showDialog('bottom-left')" icon="pi pi-arrow-up-right" label="BottomLeft" styleClass="p-button-success"></p-button>
                <p-button (click)="showDialog('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
                <p-button (click)="showDialog('bottom-right')" icon="pi pi-arrow-up-left" label="BottomRight" styleClass="p-button-success"></p-button>
            </div>
            <p-dialog header="Header" [(visible)]="visible" [position]="position" [style]="{ width: '50vw' }">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-position-demo"></app-code>
    `
})
export class PositionDoc {
    visible: boolean = false;

    position: string = 'center';

    showDialog(position: string) {
        this.position = position;
        this.visible = true;
    }

    code: Code = {
        basic: `
<div class="flex flex-wrap gap-2">
    <p-button (click)="showDialog('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
    <p-button (click)="showDialog('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
</div>
<div class="flex flex-wrap gap-2">
    <p-button (click)="showDialog('top-left')" icon="pi pi-arrow-down-right" label="TopLeft" styleClass="p-button-warning"></p-button>
    <p-button (click)="showDialog('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
    <p-button (click)="showDialog('top-right')" icon="pi pi-arrow-down-left" label="TopRight" styleClass="p-button-warning"></p-button>
</div>
<div class="flex flex-wrap gap-2">
    <p-button (click)="showDialog('bottom-left')" icon="pi pi-arrow-up-right" label="BottomLeft" styleClass="p-button-success"></p-button>
    <p-button (click)="showDialog('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
    <p-button (click)="showDialog('bottom-right')" icon="pi pi-arrow-up-left" label="BottomRight" styleClass="p-button-success"></p-button>
</div>
<p-dialog header="Header" [(visible)]="visible" [position]="position" [style]="{ width: '50vw' }">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-dialog>`,

        html: `
<div class="card flex flex-column align-items-center gap-2">
    <div class="flex flex-wrap gap-2">
        <p-button (click)="showDialog('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
        <p-button (click)="showDialog('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
    </div>
    <div class="flex flex-wrap gap-2">
        <p-button (click)="showDialog('top-left')" icon="pi pi-arrow-down-right" label="TopLeft" styleClass="p-button-warning"></p-button>
        <p-button (click)="showDialog('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
        <p-button (click)="showDialog('top-right')" icon="pi pi-arrow-down-left" label="TopRight" styleClass="p-button-warning"></p-button>
    </div>
    <div class="flex flex-wrap gap-2">
        <p-button (click)="showDialog('bottom-left')" icon="pi pi-arrow-up-right" label="BottomLeft" styleClass="p-button-success"></p-button>
        <p-button (click)="showDialog('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
        <p-button (click)="showDialog('bottom-right')" icon="pi pi-arrow-up-left" label="BottomRight" styleClass="p-button-success"></p-button>
    </div>
    <p-dialog header="Header" [(visible)]="visible" [position]="position" [style]="{ width: '50vw' }">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-dialog>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'dialog-position-demo',
    templateUrl: './dialog-position-demo.html'
})
export class DialogPositionDemo {
    visible: boolean = false;

    position: string = 'center';

    showDialog(position: string) {
        this.position = position;
        this.visible = true;
    }
}`
    };
}
