import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsideComponent } from './artside.component';

describe('ArtsideComponent', () => {
  let component: ArtsideComponent;
  let fixture: ComponentFixture<ArtsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
