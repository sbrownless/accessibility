import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Broken } from './broken';

describe('Broken', () => {
  let component: Broken;
  let fixture: ComponentFixture<Broken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Broken],
    }).compileComponents();

    fixture = TestBed.createComponent(Broken);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
