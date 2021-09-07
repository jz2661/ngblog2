import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtcontentsComponent } from './artcontents.component';

describe('ArtcontentsComponent', () => {
  let component: ArtcontentsComponent;
  let fixture: ComponentFixture<ArtcontentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtcontentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtcontentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
