import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeApplianceComponent } from './type-appliance.component';

describe('TypeApplianceComponent', () => {
  let component: TypeApplianceComponent;
  let fixture: ComponentFixture<TypeApplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeApplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
