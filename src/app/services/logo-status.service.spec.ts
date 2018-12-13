import { TestBed } from '@angular/core/testing';

import { LogoStatusService } from './logo-status.service';

describe('LogoStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogoStatusService = TestBed.get(LogoStatusService);
    expect(service).toBeTruthy();
  });
});
