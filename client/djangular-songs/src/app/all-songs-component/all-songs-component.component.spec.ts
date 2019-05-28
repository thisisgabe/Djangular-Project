import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSongsComponentComponent } from './all-songs-component.component';

describe('AllSongsComponentComponent', () => {
  let component: AllSongsComponentComponent;
  let fixture: ComponentFixture<AllSongsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSongsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSongsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
