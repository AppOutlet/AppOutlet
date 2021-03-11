import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { SimpleChanges } from '@angular/core';
import { WindowRef } from '../../../util/window-ref';

describe('GalleryComponent', () => {
    let component: GalleryComponent;
    let fixture: ComponentFixture<GalleryComponent>;

    const imageUrl = 'https://app-outlet.github.io';
    const imageUrl2 = 'https://app-outlet.github.io[2]';

    const images = [imageUrl, imageUrl2];

    const changes: SimpleChanges = {
        images: {
            currentValue: images,
            previousValue: null,
            firstChange: false,
            isFirstChange(): boolean {
                return this.firstChange;
            },
        },
    };

    const mockWindowRef = {
        nativeWindow: {
            clearInterval: jest.fn(),
            setInterval: jest.fn(),
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GalleryComponent],
            providers: [
                {
                    provide: WindowRef,
                    useValue: mockWindowRef,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should setup images when component items change', () => {
        component.ngOnChanges(changes);

        expect(component.currentImage).toEqual(imageUrl);
        expect(component.currentImageIndex).toBe(0);
    });

    it('should clear interval when the images were updated', () => {
        const intervalNumber = Math.random();

        mockWindowRef.nativeWindow.setInterval.mockReturnValue(intervalNumber);

        component.ngOnChanges(changes);
        component.ngOnChanges(changes);

        expect(mockWindowRef.nativeWindow.clearInterval.mock.calls.length).toBe(
            1,
        );

        expect(mockWindowRef.nativeWindow.clearInterval.mock.calls[0][0]).toBe(
            intervalNumber,
        );
    });

    it('should not affect the component if the change is null', () => {
        component.ngOnChanges({
            images: {
                currentValue: null,
                previousValue: null,
                firstChange: false,
                isFirstChange(): boolean {
                    return this.firstChange;
                },
            },
        });

        expect(component.currentImage).toBeUndefined();
        expect(component.currentImageIndex).toBeUndefined();
    });

    it('should switch to the next image', () => {
        component.ngOnChanges(changes);
        component.images = images;
        component.handleImages();

        expect(component.currentImage).toEqual(imageUrl2);
        expect(component.currentImageIndex).toBe(1);
    });

    it('should back to the first image when reach on end of images', () => {
        component.ngOnChanges(changes);
        component.images = images;
        component.handleImages();
        component.handleImages();

        expect(component.currentImage).toEqual(imageUrl);
        expect(component.currentImageIndex).toBe(0);
    });

    it('should do nothing when handleImages() does not have all parameters', () => {
        component.ngOnChanges(changes);
        component.handleImages();

        expect(component.currentImage).toEqual(imageUrl);
        expect(component.currentImageIndex).toBe(0);
    });

    it('should select image by index', () => {
        component.images = images;
        component.ngOnChanges(changes);
        component.selectImage(1);

        expect(component.currentImage).toEqual(imageUrl2);
        expect(component.currentImageIndex).toBe(1);

        component.handleImages();

        expect(component.currentImage).toEqual(imageUrl2);
        expect(component.currentImageIndex).toBe(1);
    });
});
