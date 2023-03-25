import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { AppNewsComponent } from './app.news.component';

@NgModule({
    imports: [CommonModule, FormsModule, StyleClassModule],
    exports: [AppNewsComponent],
    declarations: [AppNewsComponent]
})
export class AppNewsModule {}
