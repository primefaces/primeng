import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordDocModule } from '../../doc/password/passworddoc.module';
import { PasswordDemo } from './passworddemo';
import { PasswordDemoRoutingModule } from './passworddemo-routing.module';

@NgModule({
    imports: [CommonModule, PasswordDemoRoutingModule, PasswordDocModule],
    declarations: [PasswordDemo]
})
export class PasswordDemoModule {}
