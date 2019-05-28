import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetailComponentComponent } from './song-detail-component.component';

describe('SongDetailComponentComponent', () => {
  let component: SongDetailComponentComponent;
  let fixture: ComponentFixture<SongDetailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongDetailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
