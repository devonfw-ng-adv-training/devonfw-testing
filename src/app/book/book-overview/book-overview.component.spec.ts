import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {BookOverviewComponent} from './book-overview.component';
import {MatIconModule} from '@angular/material';
import {BookService} from '../book.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {SecurityService} from '../../shared/routing/security.service';
import {MockComponents} from 'ng-mocks';
import {BookCardComponent} from '../book-card/book-card.component';

describe('BookOverviewComponent', () => {
  let component: BookOverviewComponent;
  let fixture: ComponentFixture<BookOverviewComponent>;
  let moduleService: SecurityService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookOverviewComponent, MockComponents(BookCardComponent)],
      imports: [
        MatIconModule,
        RouterTestingModule.withRoutes([{path: 'books', component: BookOverviewComponent}])
      ],
      providers: [
        SecurityService,
        {
          provide: BookService, useValue: {
            findAll: function () {
              return of([
                {'id': 2, 'author': 'Gavin King', 'title': 'Java Persistence With Hibernate', 'isbn': '9781617290459'},
                {'id': 3, 'author': 'Douglas Crockford', 'title': 'JavaScript: The Good Parts', 'isbn': '9780596517748'},
                {'id': 4, 'author': 'Kent Beck', 'title': 'Test Driven Development', 'isbn': '9780321146533'}
              ]);
            },
            clearBooks: function () {
              return of([]);
            }
          }
        }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    moduleService = fixture.debugElement.injector.get(SecurityService);
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

  it('show guids of services', () => {
    console.log('module: ' + moduleService.getUUID());
    cardComponentsDebugElement()
      .map(element => element.injector.get(SecurityService))
      .forEach((service, index) => console.log('comp' + index + ': ' + service.getUUID()));
  });

  it('show guids of services - reset', fakeAsync(() => {
    console.log('module: ' + moduleService.getUUID());
    cardComponentsDebugElement()
      .map(element => element.injector.get(SecurityService))
      .forEach((service, index) => console.log('comp' + index + ': ' + service.getUUID()));

    component.clearBooks();
    tick();
    fixture.detectChanges();
    console.log('module: ' + moduleService.getUUID());
    cardComponentsDebugElement()
      .map(element => element.injector.get(SecurityService))
      .forEach((service, index) => console.log('comp' + index + ': ' + service.getUUID()));
  }));

  // helper
  function cardComponents(): BookCardComponent[] {
    return fixture.debugElement.queryAll(By.directive(BookCardComponent))
      .map(element => element.componentInstance);
  }

  // helper
  function cardComponentsDebugElement(): DebugElement[] {
    return fixture.debugElement.queryAll(By.directive(BookCardComponent));
  }
});
