import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primengrtl/button';
import { InputSwitchModule } from 'primengrtl/inputswitch';
import { RadioButtonModule } from 'primengrtl/radiobutton';
import { SidebarModule } from 'primengrtl/sidebar';
import { AppConfigComponent } from './app.config.component';
import { SelectButtonModule } from 'primengrtl/selectbutton';
@NgModule({
    imports: [CommonModule, FormsModule, SidebarModule, InputSwitchModule, ButtonModule, RadioButtonModule, SelectButtonModule],
    exports: [AppConfigComponent],
    declarations: [AppConfigComponent]
})
export class AppConfigModule {}
