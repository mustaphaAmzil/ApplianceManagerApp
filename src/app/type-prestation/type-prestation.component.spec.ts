import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePrestationComponent } from './type-prestation.component';

describe('TypePrestationComponent', () => {
  let component: TypePrestationComponent;
  let fixture: ComponentFixture<TypePrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePrestationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
