import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'card-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, SkeletonModule],
    template: `
        <app-docsectiontext>
            <p>Sample Card implementation using different Skeleton components and Tailwind CSS utilities.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="rounded-sm border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
                <div class="flex mb-4">
                    <p-skeleton shape="circle" size="4rem" class="mr-2" />
                    <div>
                        <p-skeleton width="10rem" class="mb-2" />
                        <p-skeleton width="5rem" class="mb-2" />
                        <p-skeleton height=".5rem" />
                    </div>
                </div>
                <p-skeleton width="100%" height="150px" />
                <div class="flex justify-between mt-4">
                    <p-skeleton width="4rem" height="2rem" />
                    <p-skeleton width="4rem" height="2rem" />
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class CardDoc {}
