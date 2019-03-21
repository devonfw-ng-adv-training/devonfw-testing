import {async, inject, TestBed} from '@angular/core/testing';

import {BookService} from './book.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('BookService', () => {
  let service: BookService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [BookService]
    });
  });

  beforeEach(inject([BookService], (s) => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should request to find all elements`,
    // 1. async: HttpClient works with Observables
    async(
      // 2. injecting HttpTestingController
      inject([HttpTestingController], (backend: HttpTestingController) => {
        service.findAll().subscribe();

        // 3. HttpTestingController former MockBackend
        backend.expectOne({url: '/api/book', method: 'GET'});
        // 4. Verify that no unmatched requests are outstanding.
        backend.verify();
      })
    )
  );

  it(`should request to find one element`, async(inject([HttpTestingController], (backend: HttpTestingController) => {
    service.findOne(5).subscribe();
    backend.expectOne({url: '/api/book/5', method: 'GET'});
    backend.verify();
  })));

  it(`should request to save one element`, async(inject([HttpTestingController], (backend: HttpTestingController) => {
    const body = {author: 'test', id: 5, isbn: '123456789', title: 'mock'};
    service.save(body).subscribe();
    const request = backend.expectOne({url: '/api/book', method: 'POST'});
    expect(request.request.body).toEqual(body);
    backend.verify();
  })));
});
