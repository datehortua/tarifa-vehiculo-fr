import { TestBed } from '@angular/core/testing';

import { HistorialTarifasService } from './historial-tarifas.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('HistorialTarifas', () => {
  let service: HistorialTarifasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialTarifasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
