import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rightbar } from './rightbar';

describe('Rightbar', () => {
  let component: Rightbar;
  let fixture: ComponentFixture<Rightbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rightbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rightbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
