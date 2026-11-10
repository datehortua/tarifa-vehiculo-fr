import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPrimasComponent } from './historial-primas.component';
import { describe, beforeEach, it, expect } from 'vitest';

describe('HistorialPrimas', () => {
  let component: HistorialPrimasComponent;
  let fixture: ComponentFixture<HistorialPrimasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialPrimasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialPrimasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
