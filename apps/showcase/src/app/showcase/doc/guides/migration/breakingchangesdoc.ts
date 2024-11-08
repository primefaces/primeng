import { Component } from '@angular/core';

@Component({
    selector: 'breaking-doc',
    template: `
        <app-docsectiontext>
            <h4>SASS Themes</h4>
            <p>
                The styled mode theming has been reimplemented from scratch based on an all-new architecture. The <i>theme.css</i> and the <i>primeng/resources</i> do not exist anymore, so any imports of these assets needs to be removed. If you had a
                custom theme for v17, the theme needs to be recreated using the new APIs. See the customization section at <a href="/theming" class="">styled mode</a> for details.
            </p>
            <h4>Removed Components</h4>
            <ul class="flex flex-col gap-2 leading-normal">
                <li><i class="mark">TriStateCheckbox</i> | Use Checkbox with indeterminate option.</li>
                <li><i class="mark">DataViewLayoutOptions</i> | Use SelectButton instead.</li>
                <li><i class="mark">pAnimate</i> | Use pAnimateOnScroll instead.</li>
            </ul>
            <h4>Removed Files</h4>
            <li>Themes under the <i class="mark">primeng/resources</i> path, migration to new styled mode is necessary.</li>
            <h4>Messages and Message</h4>
            <p>
                <i class="mark">Messages</i> component is deprecated due to unnecessary role of being just a wrapper around multiple message instances and it's replaced with the new <i>Message</i>. Instead of message, users now need to loop through
                their custom array to display multiple messages to achieve same behavior. The spacing, closable and life properties of the <i>Message</i> have breaking changes to provide <i>Message</i> functionality. Default margin is removed,
                closable is false by default and messages do not disappear automatically.
            </p>
            <h4>Message Interface</h4>
            <p><i class="mark">Message</i> interface in <i class="mark">primeng/api</i> is renamed as <i class="mark">ToastMessageOptions</i> due to name collision with the <i>Message</i> component.</p>
            <h4>Removed Features</h4>
            <ul class="flex flex-col gap-2 leading-normal">
                <li>Sidebar/Drawer <i class="mark">size</i> property is removed, use a responsive class utilty as replacement, demos have new examples.</li>
            </ul>
            <h4>Removed Style Classes</h4>
            <ul class="flex flex-col gap-2 leading-normal">
                <li><i class="mark">.p-link</i>, use a button in link mode.</li>
                <li><i class="mark">.p-highlight</i>, each component have its own class such as <i class="mark">.p-select-option-selected</i>.</li>
                <li><i class="mark">.p-fluid</i>, use the new built-in <i class="mark">fluid</i> property of the supported components or the <i class="mark">Fluid</i> component.</li>
            </ul>
            <h4>Premium Templates</h4>
            <p>Application templates like Apollo do not support PrimeNG v18 yet, all templates will be updated to PrimeNG v18 by the end of the 2024.</p>
        </app-docsectiontext>
    `
})
export class BreakingChangesDoc {}
