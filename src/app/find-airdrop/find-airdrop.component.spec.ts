import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAirdropComponent } from './find-airdrop.component';

describe('FindAirdropComponent', () => {
  let component: FindAirdropComponent;
  let fixture: ComponentFixture<FindAirdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAirdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAirdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
