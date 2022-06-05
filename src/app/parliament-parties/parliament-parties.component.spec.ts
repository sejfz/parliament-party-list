import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentPartiesComponent } from './parliament-parties.component';

describe('ParliamentPartiesComponent', () => {
  let component: ParliamentPartiesComponent;
  let fixture: ComponentFixture<ParliamentPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParliamentPartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
