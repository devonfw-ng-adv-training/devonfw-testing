import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {BookOverviewComponent} from './book-overview.component';
import {MatIconModule} from '@angular/material';
import {BookService} from '../book.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {Book} from '../book';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {By} from '@angular/platform-browser';

fdescribe('BookOverviewComponent', () => {
  let component: BookOverviewComponent;
  let fixture: ComponentFixture<BookOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookOverviewComponent, MockBookCardComponent],
      imports: [
        MatIconModule,
        RouterTestingModule.withRoutes([{path: 'books', component: BookOverviewComponent}])
      ],
      providers: [{
        provide: BookService, useValue: {
          findAll: function () {
            return of([
              {'id': 2, 'author': 'Gavin King', 'title': 'Java Persistence With Hibernate', 'isbn': '9781617290459'},
              {'id': 3, 'author': 'Douglas Crockford', 'title': 'JavaScript: The Good Parts', 'isbn': '9780596517748'},
              {'id': 4, 'author': 'Kent Beck', 'title': 'Test Driven Development', 'isbn': '9780321146533'}
            ]);
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

  it('should create one child component per child', fakeAsync(() => {
    component.books$.subscribe(data => expect(cardComponents().length).toEqual(data.length));
    tick();
  }));

  it('should set child to children correctly', fakeAsync(() => {
    component.books$.subscribe(data =>
      expect(cardComponents().map(child => child.book)).toEqual(data));
    tick();
  }));

  it('should update last clicked if child component emits', () => {
    expect(component.lastClickedBook).toBeUndefined();
    cardComponents()[0].parent.emit(cardComponents()[0].book);
    expect(component.lastClickedBook).toEqual(cardComponents()[0].book);
  });

  // helper
  function cardComponents(): MockBookCardComponent[] {
    return fixture.debugElement.queryAll(By.directive(MockBookCardComponent))
      .map(element => element.componentInstance);
  }
});


@Component({
  selector: 'app-book-card',
  template: '<span>toolbar</span>',
})
class MockBookCardComponent {
  @Input() book: Book;
  @Output() parent: EventEmitter<Book> = new EventEmitter<Book>();

  constructor() {
  }
}
