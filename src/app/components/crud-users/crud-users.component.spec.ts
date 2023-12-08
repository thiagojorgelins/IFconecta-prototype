import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDUsersComponent } from './crud-users.component';

describe('CRUDUsersComponent', () => {
  let component: CRUDUsersComponent;
  let fixture: ComponentFixture<CRUDUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CRUDUsersComponent]
    });
    fixture = TestBed.createComponent(CRUDUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
