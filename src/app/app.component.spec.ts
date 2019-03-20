import {async, inject, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SecurityService} from './shared/routing/security.service';
import {
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';

describe('AppComponent', () => {
  let service: SecurityService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockToolbarComponent,
        MockNavigationComponent
      ],
      imports: [
        MatCardModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{path: 'home', component: AppComponent}]),
        MatSliderModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        BrowserAnimationsModule,
      ],
      providers: [SecurityService]
    }).compileComponents();
  }));

  beforeEach(inject([SecurityService], s => {
    service = s;
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

@Component({
  selector: 'app-toolbar',
  template: '<span>toolbar</span>',
})
class MockToolbarComponent {
  constructor() {
  }
}

@Component({
  selector: 'app-navigation',
  template: '<span>navigation</span>',
})
class MockNavigationComponent {
  constructor() {
  }
}
