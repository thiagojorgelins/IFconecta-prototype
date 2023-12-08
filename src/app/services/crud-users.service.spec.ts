import { TestBed } from '@angular/core/testing';

import { CRUDUsersService } from './crud-users.service';

describe('CRUDUsersService', () => {
  let service: CRUDUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
