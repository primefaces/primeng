// import { Component } from '@angular/core';
// import { Code } from '@domain/code';

// @Component({
//     selector: 'dynamic-doc',
//     template: `
//         <app-docsectiontext>
//             <p>AccordionTabs can be generated dynamically using the standard <i>ngFor</i> directive.</p>
//         </app-docsectiontext>
//         <div class="card">
//             <p-accordion [activeIndex]="0">
//                 <p-accordionTab [header]="tab.title" *ngFor="let tab of tabs">
//                     <p class="m-0">
//                         {{ tab.content }}
//                     </p>
//                 </p-accordionTab>
//             </p-accordion>
//         </div>
//         <app-code [code]="code" selector="accordion-dynamic-demo"></app-code>
//     `
// })
// export class DynamicDoc {
//     tabs = [
//         { title: 'Title 1', content: 'Content 1' },
//         { title: 'Title 2', content: 'Content 2' },
//         { title: 'Title 3', content: 'Content 3' }
//     ];
//     code: Code = {
//         basic: `<p-accordion [activeIndex]="0">
//     <p-accordionTab [header]="tab.title" *ngFor="let tab of tabs">
//         <p class="m-0">
//             {{ tab.content }}
//         </p>
//     </p-accordionTab>
// </p-accordion>`,

//         html: `<div class="card">
//     <p-accordion [activeIndex]="0">
//         <p-accordionTab [header]="tab.title" *ngFor="let tab of tabs">
//             <p class="m-0">
//                 {{ tab.content }}
//             </p>
//         </p-accordionTab>
//     </p-accordion>
// </div>`,

//         typescript: `import { Component } from '@angular/core';
// import { AccordionModule } from 'primeng/accordion';
// import { CommonModule } from '@angular/common';

// @Component({
//     selector: 'accordion-dynamic-demo',
//     templateUrl: './accordion-dynamic-demo.html',
//     standalone: true,
//     imports: [AccordionModule, CommonModule]
// })
// export class AccordionDynamicDemo {
//     tabs = [
//         { title: 'Title 1', content: 'Content 1' },
//         { title: 'Title 2', content: 'Content 2' },
//         { title: 'Title 3', content: 'Content 3' }
//     ];
// }`
//     };
// }
