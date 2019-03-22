import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {BookOverviewComponent} from './book-overview.component';
import {MatCardModule, MatIconModule} from '@angular/material';
import {BookService} from '../book.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {Book} from '../book';

describe('BookOverviewComponent', () => {
  let component: BookOverviewComponent;
  let fixture: ComponentFixture<BookOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookOverviewComponent],
      imports: [
        MatIconModule,
        MatCardModule,
        RouterTestingModule.withRoutes([{path: 'books', component: BookOverviewComponent}])
      ],
      providers: [{
        provide: BookService, useValue: {
          findAll: function () {
            return of([{id: 4, author: 'Kent Beck', title: 'TDD', isbn: '9780321146533'} as Book]);
          }
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check observable', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.books$.subscribe(item => {
      expect(item).toEqual([{id: 4, author: 'Kent Beck', title: 'TDD', isbn: '9780321146533'} as Book])
    });
    tick();
  }));
});
