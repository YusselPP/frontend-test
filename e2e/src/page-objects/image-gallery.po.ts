import { by, element } from 'protractor';

export class ImageGallery {
  private root = element(by.css('.image-gallery'));
  private images = this.root.all(by.css('.image'));

  isPresent() {
    return this.root.isPresent();
  }

  getSize() {
    return this.root.getSize();
  }

  getImagesCount() {
    return this.images.count();
  }

  getImageDescription(imageNum: number) {
    return this.images.get(imageNum).getAttribute('alt');
  }

  getImageSize(imageNum: number) {
    return this.images.get(imageNum).getSize();
  }
}
