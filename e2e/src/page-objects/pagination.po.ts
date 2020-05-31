import { by, element } from 'protractor';

export class Pagination {
  private root = element(by.css('ngb-pagination'));
  private activeLink = this.root.element(
    by.css('.page-item.active .page-link')
  );

  isPresent() {
    return this.root.isPresent();
  }

  goToPage(page: number) {
    return this.getLinkByNumber(page).click();
  }

  getCurrentPage() {
    return this.activeLink.getText().then((text) => parseInt(text, 10));
  }

  private getLinkByNumber(pageNum: number) {
    return this.root.element(by.cssContainingText('.page-link', `${pageNum}`));
  }
}
