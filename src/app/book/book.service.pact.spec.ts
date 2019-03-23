import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {PactWeb} from '@pact-foundation/pact/pact-web';
import {BookService} from './book.service';
import {HTTPMethod} from '@pact-foundation/pact/common/request';
import {eachLike, somethingLike, term} from '@pact-foundation/pact/dsl/matchers';

describe('pact book service test suite', () => {
  let provider: PactWeb;
  let consumer: BookService;
  const expectedBody = eachLike(somethingLike({
    author: somethingLike('Patrick Rothfuss'),
    id: somethingLike(68232),
    isbn: term({generate: '415521212', matcher: '^[0-9]{9}$'}),
    title: somethingLike('The Name of the Wind')
  }), {min: 1});

  beforeAll((done: any) => {
    // Select mock server
    provider = new PactWeb({
      consumer: 'ui-library',
      provider: 'backend-books',
      log: 'logs/pact.log',
    });

    // Required if not single-run
    provider.removeInteractions().then(done, done.fail);
  });

  afterAll((done: any) => {
    // Write pact file
    provider.finalize().then(done, done.fail);
  });

  beforeEach(() => {
    // Use real HttpClient in test
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BookService],
    });
    consumer = TestBed.get(BookService);
  });

  // verify that all interactions got called
  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  // Wrap calls to provider
  describe('find all books', () => {
    // Define expected interactions with the server
    beforeAll((done: any) => {

      Promise.all([
        provider.addInteraction({
          state: 'Get all books',
          uponReceiving: 'Get all books available',
          withRequest: {
            method: HTTPMethod.GET,
            path: '/api/book',
          },
          willRespondWith: {
            status: 200,
            body: expectedBody
          }
        }),
      ]).then(done, error => done.fail(error));
    });

    // Execute REST-call to 'create' json file
    it('should get books', (done: any) => {
      consumer.findAll()
        .toPromise().then(done, done.fail);
    });
  });
});
