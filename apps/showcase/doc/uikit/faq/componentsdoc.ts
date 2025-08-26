import { Component } from '@angular/core';
import { AppDocModule } from '@/components/doc/app.doc.module';

@Component({
    selector: 'components-doc',
    standalone: true,
    imports: [AppDocModule],
    template: `<app-docsectiontext>
        <ul class="leading-normal px-10 mb-2 list-disc">
            <li>
                <div class="font-bold">How to change base font size?</div>
                <p>The base font size used in PrimeOne is 14px. Similar to how rem works in CSS, this is controlled by the <i>&#123;app.font.size&#125;</i> token located under the "app" set in Tokens Studio.</p>
                <p>When you change the value of this token, all size calculations will adjust accordingly based on the new value.</p>
                <p>
                    To apply this change, you need to use the “Apply” function in Tokens Studio. However, we do not recommend using the “<b>Apply to Document</b>” option if the change affects the entire library, as it may lead to unexpected errors.
                </p>
                <p>Instead, go page by page and review the updates carefully before applying changes.</p>
                <p>Also note: not all token values in the library may be linked to <i>&#123;app.font.size&#125;</i>. So it's important to check components individually.</p>
                <p>After completing each page, verify the updated values under Local Variables and make manual adjustments if needed.</p>
                <p>Alternatively, you can use <b>Export Styles & Variables</b> to Figma in Tokens Studio to sync the updated values.</p>
            </li>
        </ul>
    </app-docsectiontext>`
})
export class ComponentsDoc {}
