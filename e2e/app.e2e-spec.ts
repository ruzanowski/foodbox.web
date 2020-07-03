import { FoodTemplatePage } from './app.po';

describe('Food App', function() {
  let page: FoodTemplatePage;

  beforeEach(() => {
    page = new FoodTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
