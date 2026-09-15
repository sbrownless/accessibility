import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WideGrid } from './wide-grid';

describe('WideGrid', () => {
  let component: WideGrid;
  let fixture: ComponentFixture<WideGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WideGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(WideGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
