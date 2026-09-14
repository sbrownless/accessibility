import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fixed } from './fixed';

describe('Fixed', () => {
  let component: Fixed;
  let fixture: ComponentFixture<Fixed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fixed],
    }).compileComponents();

    fixture = TestBed.createComponent(Fixed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
