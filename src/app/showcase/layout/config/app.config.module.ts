import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { AppConfigComponent } from './app.config.component';
import { SelectButtonModule } from 'primeng/selectbutton';
@NgModule({
    imports: [CommonModule, FormsModule, SidebarModule, InputSwitchModule, ButtonModule, RadioButtonModule, SelectButtonModule],
    exports: [AppConfigComponent],
    declarations: [AppConfigComponent]
})
export class AppConfigModule {}
