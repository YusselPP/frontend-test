import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [ImageGalleryComponent, SearchBarComponent],
  imports: [CommonModule, FormsModule],
  exports: [NgbModule, FormsModule, ImageGalleryComponent, SearchBarComponent]
})
export class SharedModule {}
