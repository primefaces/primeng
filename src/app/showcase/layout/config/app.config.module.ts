import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@alamote/primeng/button';
import { InputSwitchModule } from '@alamote/primeng/inputswitch';
import { RadioButtonModule } from '@alamote/primeng/radiobutton';
import { SidebarModule } from '@alamote/primeng/sidebar';
import { AppConfigComponent } from './app.config.component';
import { SelectButtonModule } from '@alamote/primeng/selectbutton';
@NgModule({
    imports: [CommonModule, FormsModule, SidebarModule, InputSwitchModule, ButtonModule, RadioButtonModule, SelectButtonModule],
    exports: [AppConfigComponent],
    declarations: [AppConfigComponent]
})
export class AppConfigModule {}
