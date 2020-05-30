import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';

@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [CommonModule],
  exports: [NgbModule, ImageGalleryComponent]
})
export class SharedModule {}
