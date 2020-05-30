import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryComponent } from './image-gallery.component';
import { By } from '@angular/platform-browser';

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGalleryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all images', () => {
    const images = new Array(9).fill({ title: 'image', url: 'image-url' });

    const galleryElement = fixture.debugElement;

    let imageElements = galleryElement.queryAll(By.css('.image-container'));
    expect(imageElements.length).toBe(0);

    component.images = images;
    fixture.detectChanges();

    imageElements = galleryElement.queryAll(By.css('.image-container'));
    expect(imageElements.length).toBe(images.length);
  });

  it('rendered images should have src and title', () => {
    const images = [
      { title: 'image', url: 'image-url' },
      { title: 'image2', url: 'image2-url' },
      { title: 'image3', url: 'image3-url' },
      { title: 'image4', url: 'image4-url' },
      { title: 'image5', url: 'image5-url' },
      { title: 'image6', url: 'image6-url' }
    ];

    const galleryElement = fixture.debugElement;

    component.images = images;
    fixture.detectChanges();

    const imageElements = galleryElement.queryAll(By.css('.image'));

    imageElements.forEach((imageEle, index) => {
      expect(imageEle.attributes.src).toBe(images[index].url);
      expect(imageEle.attributes.alt).toBe(images[index].title);
    });
  });
});
