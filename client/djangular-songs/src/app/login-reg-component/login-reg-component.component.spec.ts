import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegComponentComponent } from './login-reg-component.component';

describe('LoginRegComponentComponent', () => {
  let component: LoginRegComponentComponent;
  let fixture: ComponentFixture<LoginRegComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
