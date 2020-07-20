import {Component, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-inputStyleSwitch',
    template: `
        <div class="app-inputstyleswitch">
            <h4>Input Style</h4>
            <div class="p-formgroup-inline">
                <div class="p-field-radiobutton">
                    <p-radioButton name="inputstyle" value="outlined" [(ngModel)]="value" (onClick)="onChange()" inputId="input_outlined"></p-radioButton>
                    <label for="input_outlined">Outlined</label>
                </div>
                <div class="p-field-radiobutton">
                    <p-radioButton name="inputstyle" value="filled" [(ngModel)]="value" (onClick)="onChange()" inputId="input_filled"></p-radioButton>
                    <label for="input_filled">Filled</label>
                </div>
            </div>
        </div>
    `
})
export class AppInputStyleSwitchComponent {
    value: string;

    constructor(private app: AppComponent) {
        this.value = this.app.appState.inputStyle;
    }

    onChange() {
        if (this.app.appState.inputStyle != this.value)
            this.app.appState.inputStyle = this.value;
    }
}


@NgModule({
    imports: [RadioButtonModule, FormsModule],
    exports: [AppInputStyleSwitchComponent],
    declarations: [AppInputStyleSwitchComponent]
})
export class AppInputStyleSwitchModule { }
