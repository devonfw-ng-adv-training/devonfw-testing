import {async, inject, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SecurityService} from './shared/routing/security.service';
import {MatCardModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
  let service: SecurityService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        MatCardModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{path: 'home', component: AppComponent}])
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
