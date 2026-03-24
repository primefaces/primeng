import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

const images = [
    'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1704905832963-37d6f12654b7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1470130623320-9583a8d06241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1678841446310-d045487ef299?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1511885663737-eea53f6d6187?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1638255402906-e838358069ab?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

@Component({
    selector: 'carousel-gallery-doc',
    standalone: true,
    imports: [CarouselModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Two carousels synchronized via <i>slide</i> input to create a gallery with thumbnail navigation.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="mt-8 mb-16">
                <div class="max-w-2xl mx-auto">
                    <p-carousel align="center" [slide]="selectedImage()" (onSlideChange)="onSlideChange($event)">
                        <p-carousel-content style="height: 396px">
                            @for (image of images; track image; let i = $index) {
                                <p-carousel-item class="basis-full!">
                                    <img [attr.draggable]="false" [src]="image" [alt]="'Image ' + (i + 1)" class="h-full w-full object-cover select-none" />
                                </p-carousel-item>
                            }
                        </p-carousel-content>
                    </p-carousel>
                    <p-carousel class="mt-3" [spacing]="8" align="center" [slide]="selectedImage()">
                        <p-carousel-content style="height: 90px">
                            @for (image of images; track image; let i = $index) {
                                <p-carousel-item class="cursor-pointer basis-1/4! transition-opacity" [class.opacity-60]="selectedImage() !== i" [class.hover:opacity-40]="selectedImage() !== i" (click)="selectImage(i)">
                                    <img [attr.draggable]="false" [src]="image" [alt]="'Image ' + (i + 1)" class="h-full w-full object-cover select-none" />
                                </p-carousel-item>
                            }
                        </p-carousel-content>
                    </p-carousel>
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class CarouselGalleryDoc {
    images = images;
    selectedImage = signal(0);

    selectImage(index: number) {
        this.selectedImage.set(index);
    }

    onSlideChange(event: { value: number }) {
        this.selectedImage.set(event.value);
    }
}
