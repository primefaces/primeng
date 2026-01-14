import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'introduction-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Various PrimeNG Components utilize native CSS animations to provide an enhanced user experience. The default animations are based on the best practices recommended by the usability experts. In case you need to customize the default
                animations, this documentation covers the entire set of built-in animations.
            </p>
            <p>
                Animations are defined using a combination of style classes and keyframes. The ⁠<i>.&#123;classname&#125;-enter-active</i> and ⁠<i>.&#123;classname&#125;-leave-active</i> classes specify the animation name, duration, and easing
                function. You can customize animations globally by overriding the default animation classes, affecting all components. Alternatively, you can apply scoped classes to individual components to modify their animations independently. For
                demo purposes, this second approach is used throughout the next sections.
            </p>
        </app-docsectiontext>
    `
})
export class IntroductionDoc {}
