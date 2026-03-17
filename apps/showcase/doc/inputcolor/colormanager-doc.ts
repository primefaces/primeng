import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'color-manager-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>colorManager</i> module provides utilities for programmatic color manipulation. It exports the <i>Color</i> class and helper functions for working with colors outside of the InputColor component.</p>
        </app-docsectiontext>

        <div class="doc-section-description font-bold mb-4">Color class</div>
        <app-docsectiontext>
            <p>The <i>Color</i> class is the base class for all color classes. It provides the basic functionality for all color classes.</p>
            <ul class="leading-normal list-disc list-inside">
                <li class="mt-2"><i>clone()</i>: Clones the color.</li>
                <li class="mt-2"><i>toString(format)</i>: Converts the color to a string.</li>
                <li class="mt-2"><i>toFormat(format)</i>: Converts the color to a specific format.</li>
                <li class="mt-2"><i>toJSON()</i>: Converts the color to a JSON object.</li>
                <li class="mt-2"><i>getChannelRange(channel)</i>: Returns the range of the channel.</li>
                <li class="mt-2"><i>getFormat()</i>: Returns the format of the color.</li>
                <li class="mt-2"><i>getChannels()</i>: Returns the channels of the color.</li>
                <li class="mt-2"><i>getChannelValue(channel)</i>: Returns the value of the channel.</li>
                <li class="mt-2"><i>getSpaceAxes(xyChannels)</i>: Returns the axes of the color.</li>
                <li class="mt-2"><i>incChannelValue(channel, step)</i>: Increments the value of the channel by the step.</li>
                <li class="mt-2"><i>decChannelValue(channel, step)</i>: Decrements the value of the channel by the step.</li>
                <li class="mt-2"><i>setChannelValue(channel, value)</i>: Returns a new color with the value of the channel changed.</li>
            </ul>
        </app-docsectiontext>
    `
})
export class ColorManagerDoc {}
