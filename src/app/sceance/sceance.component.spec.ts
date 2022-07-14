import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceanceComponent } from './sceance.component';

describe('SceanceComponent', () => {
  let component: SceanceComponent;
  let fixture: ComponentFixture<SceanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
