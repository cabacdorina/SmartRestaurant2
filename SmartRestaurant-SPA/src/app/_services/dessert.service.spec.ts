/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DessertService } from './dessert.service';

describe('Service: Dessert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DessertService]
    });
  });

  it('should ...', inject([DessertService], (service: DessertService) => {
    expect(service).toBeTruthy();
  }));
});
