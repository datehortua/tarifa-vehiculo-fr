import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { TarifaFormComponent } from './components/tarifa-form/tarifa-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, TarifaFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debería renderizar el componente TarifaForm', async () => {
    const fixture = TestBed.createComponent(App);

    // Forzamos la detección de cambios
    fixture.detectChanges();

    // Esperamos a que Angular termine de renderizar
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // Buscamos el tag
    const tarifaFormTag = compiled.querySelector('app-tarifa-form');
    expect(tarifaFormTag).toBeTruthy();
  });
});
