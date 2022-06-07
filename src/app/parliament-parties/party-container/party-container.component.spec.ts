import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyContainerComponent } from './party-container.component';

describe('PartyContainerComponent', () => {
  let component: PartyContainerComponent;
  let fixture: ComponentFixture<PartyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
