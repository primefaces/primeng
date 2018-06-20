import { PrimengPage } from './app.po';

describe('primeng App', () => {
  let page: PrimengPage;

  beforeEach(() => {
    page = new PrimengPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getPROText()
      .then(msg => expect(msg).toEqual('PrimeNG PRO Support'))
      .then(done, done.fail);
  });
});
