import { NgModule, Directive, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
export class Header {
}
Header.decorators = [
    { type: Component, args: [{
                selector: 'p-header',
                template: '<ng-content></ng-content>'
            },] }
];
export class Footer {
}
Footer.decorators = [
    { type: Component, args: [{
                selector: 'p-footer',
                template: '<ng-content></ng-content>'
            },] }
];
export class PrimeTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
}
PrimeTemplate.decorators = [
    { type: Directive, args: [{
                selector: '[pTemplate]',
                host: {}
            },] }
];
PrimeTemplate.ctorParameters = () => [
    { type: TemplateRef }
];
PrimeTemplate.propDecorators = {
    type: [{ type: Input }],
    name: [{ type: Input, args: ['pTemplate',] }]
};
export class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Header, Footer, PrimeTemplate],
                declarations: [Header, Footer, PrimeTemplate]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9hcGkvIiwic291cmNlcyI6WyJzaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBYyxTQUFTLEVBQUMsS0FBSyxFQUFxQyxXQUFXLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTXhDLE1BQU0sT0FBTyxNQUFNOzs7WUFKbEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsMkJBQTJCO2FBQ3hDOztBQU9ELE1BQU0sT0FBTyxNQUFNOzs7WUFKbEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsMkJBQTJCO2FBQ3hDOztBQVFELE1BQU0sT0FBTyxhQUFhO0lBTXRCLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQztJQUVqRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7OztZQWZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsSUFBSSxFQUFFLEVBQ0w7YUFDSjs7O1lBcEJpRixXQUFXOzs7bUJBdUJ4RixLQUFLO21CQUVMLEtBQUssU0FBQyxXQUFXOztBQWN0QixNQUFNLE9BQU8sWUFBWTs7O1lBTHhCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsYUFBYSxDQUFDO2dCQUN0QyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQzthQUM5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRXZlbnRFbWl0dGVyLERpcmVjdGl2ZSxJbnB1dCxPdXRwdXQsQ29udGVudENoaWxkcmVuLENvbnRlbnRDaGlsZCxUZW1wbGF0ZVJlZixBZnRlckNvbnRlbnRJbml0LFF1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWhlYWRlcicsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXIge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWZvb3RlcicsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcbmV4cG9ydCBjbGFzcyBGb290ZXIge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFRlbXBsYXRlXScsXG4gICAgaG9zdDoge1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUZW1wbGF0ZSB7XG4gICAgXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgncFRlbXBsYXRlJykgbmFtZTogc3RyaW5nO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbiAgICBcbiAgICBnZXRUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtIZWFkZXIsRm9vdGVyLFByaW1lVGVtcGxhdGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0hlYWRlcixGb290ZXIsUHJpbWVUZW1wbGF0ZV1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHsgfVxuIl19