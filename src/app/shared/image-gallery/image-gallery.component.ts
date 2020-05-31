import { Component, OnInit, Input } from '@angular/core';
import { GalleryImage } from './interfaces';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.sass']
})
export class ImageGalleryComponent implements OnInit {
  @Input() images: GalleryImage[];

  constructor() {}

  ngOnInit(): void {}
}
