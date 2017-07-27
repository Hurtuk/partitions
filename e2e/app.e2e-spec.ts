import { Site3Page } from './app.po';

describe('site3 App', () => {
  let page: Site3Page;

  beforeEach(() => {
    page = new Site3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
