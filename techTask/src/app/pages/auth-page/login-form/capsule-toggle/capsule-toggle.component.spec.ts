import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsuleToggleComponent } from './capsule-toggle.component';

describe('CapsuleToggleComponent', () => {
  let component: CapsuleToggleComponent;
  let fixture: ComponentFixture<CapsuleToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapsuleToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapsuleToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
