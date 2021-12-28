import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageprovidersComponent } from './manageproviders.component';

describe('ManageprovidersComponent', () => {
  let component: ManageprovidersComponent;
  let fixture: ComponentFixture<ManageprovidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageprovidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageprovidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
