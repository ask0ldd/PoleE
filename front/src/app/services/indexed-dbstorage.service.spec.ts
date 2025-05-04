import { TestBed } from '@angular/core/testing';

import { IndexedDBStorageService } from './indexed-dbstorage.service';

describe('IndexedDBStorageService', () => {
  let service: IndexedDBStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDBStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
