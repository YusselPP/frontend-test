import { browser, by, element } from 'protractor';
import { SearchBar } from './search-bar.po';
import { ImageGallery } from './image-gallery.po';
import { Pagination } from './pagination.po';

export class GifSearchPage {
  searchBar = new SearchBar();
  imageGallery = new ImageGallery();
  pagination = new Pagination();

  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getTitleText() {
    return element(by.css('.navbar-brand')).getText();
  }
}
