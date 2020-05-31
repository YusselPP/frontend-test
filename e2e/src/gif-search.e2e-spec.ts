import { GifSearchPage } from './page-objects/gif-search.po';
import { browser, logging } from 'protractor';

describe('Gifs search page', () => {
  let page: GifSearchPage;

  beforeEach(() => {
    page = new GifSearchPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Frontend Test');
  });

  it('should display the search input', () => {
    expect(page.searchBar.isPresent()).toBe(true);
  });

  it('should display search results in a 3x3 grid', async () => {
    page.searchBar.setSearchQuery('burger');
    expect(page.imageGallery.getImagesCount()).toBe(9);

    const gallerySize = await page.imageGallery.getSize();
    const imageSize = await page.imageGallery.getImageSize(0);

    expect(gallerySize.width).toBeGreaterThanOrEqual(imageSize.width * 3);
  });

  it('should display a pagination bar', () => {
    expect(page.pagination.isPresent()).toBe(true);
  });

  it('should change page when clicking on a page number', async () => {
    const firstImageDesc = await page.imageGallery.getImageDescription(0);

    page.pagination.goToPage(3);

    expect(page.pagination.getCurrentPage()).toBe(3);
    expect(page.imageGallery.getImageDescription(0)).not.toBe(firstImageDesc);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
