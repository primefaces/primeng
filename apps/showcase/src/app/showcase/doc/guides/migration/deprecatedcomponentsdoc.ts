import { Component } from '@angular/core';

@Component({
    selector: 'deprecated-doc',
    template: `
        <app-docsectiontext>
            <h4>Deprecated Components</h4>
            <p>Components that are deprecated since their functionality is provided by other components.</p>
            <ul class="flex flex-col gap-2 leading-normal">
                <li><i class="mark">Chips</i> | Use AutoComplete with <i class="mark">multiple</i> enabled and <i class="mark">typeahead</i> disabled.</li>
                <li><i class="mark">TabMenu</i> | Use Tabs without panels.</li>
                <li><i class="mark">Steps</i> | Use Stepper without panels.</li>
                <li><i class="mark">InlineMessage</i> | Use Message component.</li>
                <li><i class="mark">TabView</i> | Use the new Tabs components.</li>
                <li><i class="mark">Accordion</i> | Use with the new <i>AccordionHeader</i> and <i>AccordionContent</i> components.</li>
                <li><i class="mark">Messages</i> | Use with the new <i>Message</i> component.</li>
            </ul>
        </app-docsectiontext>
    `
})
export class DeprecatedComponentsDoc {}
