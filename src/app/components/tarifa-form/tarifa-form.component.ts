import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarifaService, TarifaResponse } from '../../services/tarifa.service';

@Component({
  selector: 'app-tarifa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarifa-form.component.html',
  styleUrls: ['./tarifa-form.component.css']
})
export class TarifaFormComponent {
  tarifaForm: FormGroup;
  resultado: TarifaResponse | null = null;
  cargando = false;
  errorTecnico = false;

  constructor(
    private fb: FormBuilder,
    private tarifaService: TarifaService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone // <-- Inyectamos NgZone
  ) {
    this.tarifaForm = this.fb.group({
      pnuValcomVeh: [null, [Validators.required, Validators.min(0)]],
      pnuAntgVeh: [null, [Validators.required, Validators.min(0)]],
      pnuEdacli: [null, [Validators.required, Validators.min(18), Validators.max(100)]],
      pnuCansini: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.tarifaForm.invalid) {
      this.tarifaForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.resultado = null;
    this.errorTecnico = false;

    this.tarifaService.calcularTarifa(this.tarifaForm.value).subscribe({
      next: (res) => {
        // Nos aseguramos de que el cambio ocurra dentro de la zona de Angular
        this.ngZone.run(() => {
          this.resultado = res;
          this.cargando = false;
          this.cdRef.detectChanges(); // Forzamos la actualización
        });
      },
      error: (err) => {
        console.error('Error:', err);
        this.ngZone.run(() => {
          this.errorTecnico = true;
          this.cargando = false;
          this.cdRef.detectChanges();
        });
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.tarifaForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
