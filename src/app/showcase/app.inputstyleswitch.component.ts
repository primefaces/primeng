import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { AppConfigService} from './service/appconfigservice';
import { Subscription } from 'rxjs';
import { AppConfig } from './domain/appconfig';

@Component({
    selector: 'app-inputStyleSwitch',
    template: `
        <div class="app-inputstyleswitch">
            <h4>Input Style</h4>
            <div class="p-formgroup-inline">
                <div class="p-field-radiobutton">
                    <p-radioButton name="inputstyle" value="outlined" [(ngModel)]="config.inputStyle" (onClick)="onChange()" inputId="input_outlined"></p-radioButton>
                    <label for="input_outlined">Outlined</label>
                </div>
                <div class="p-field-radiobutton">
                    <p-radioButton name="inputstyle" value="filled" [(ngModel)]="config.inputStyle" (onClick)="onChange()" inputId="input_filled"></p-radioButton>
                    <label for="input_filled">Filled</label>
                </div>
            </div>
        </div>
    `
})
export class AppInputStyleSwitchComponent implements OnInit, OnDestroy {

    value: string;
    
    config: AppConfig;
    
    public subscription: Subscription;

    constructor(private configService: AppConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
    }

    onChange() {
        this.configService.updateConfig(this.config);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [RadioButtonModule, FormsModule],
    exports: [AppInputStyleSwitchComponent],
    declarations: [AppInputStyleSwitchComponent]
})
export class AppInputStyleSwitchModule { }
