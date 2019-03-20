import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
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
import {NavigationComponent} from './shared/navigation/navigation.component';
import {MockComponent} from 'ng-mocks';
import {ToolbarComponent} from './shared/toolbar/toolbar.component';
import {ResolveEnd, ResolveStart, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  let service: SecurityService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let de: DebugElement;
  let element: any;
  let router: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(NavigationComponent),
        MockComponent(ToolbarComponent)
      ],
      imports: [
        MatCardModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{path: 'home', component: AppComponent}])
      ],
      providers: [{provide: Router, useClass: MockedRouter}, SecurityService]
    }).compileComponents();
  }));

  beforeEach(inject([SecurityService, Router], (s, r) => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    de = fixture.debugElement;
    element = fixture.nativeElement;
    service = s;
    router = r;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should set isLoadingData to true', () => {
    (router as MockedRouter).triggerRS();
    expect(app.isLoadingData).toEqual(true);
  });

  it('should set isLoadingData to false', () => {
    expect(app.isLoadingData).toEqual(false);
    (router as MockedRouter).triggerRE();
    expect(app.isLoadingData).toEqual(false);
  });

  it('should set isLoadingData to true and then to false', () => {
    expect(app.isLoadingData).toEqual(false);
    (router as MockedRouter).triggerRS();
    expect(app.isLoadingData).toEqual(true);
    (router as MockedRouter).triggerRE();
    expect(app.isLoadingData).toEqual(false);
  });
});

class MockedRouter {
  private _events = new Subject();
  public events = this._events.asObservable();
  private re = new ResolveEnd(0, 'url', 'url-after-redirects', null);
  private rs = new ResolveStart(0, 'url', 'url-after-redirects', null);

  public triggerRS() {
    this._events.next(this.rs);
  }

  public triggerRE() {
    this._events.next(this.re);
  }
}

