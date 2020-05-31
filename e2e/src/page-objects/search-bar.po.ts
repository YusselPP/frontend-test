import { by, element } from 'protractor';

export class SearchBar {
  private root = element(by.css('.search-bar'));
  private searchInput = this.root.element(by.css('input[type="search"]'));

  isPresent() {
    return this.searchInput.isPresent();
  }

  setSearchQuery(searchQuery: string) {
    return this.searchInput.sendKeys(searchQuery);
  }
}
