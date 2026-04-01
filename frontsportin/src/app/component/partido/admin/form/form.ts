import { Component, OnInit, Input, Output, EventEmitter, inject, signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../../service/notificacion';;
import { ModalService } from '../../../shared/modal/modal.service';
import { PartidoService } from '../../../../service/partido';
import { LigaService } from '../../../../service/liga';
import { IPartido } from '../../../../model/partido';
import { ILiga } from '../../../../model/liga';
import { SessionService } from '../../../../service/session';
import { LigaAdminPlist } from '../../../liga/admin/plist/plist';

@Component({
  selector: 'app-partido-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class PartidoAdminForm implements OnInit {
  @Input() partido: IPartido | null = null;
  @Input() isEditMode: boolean = false;
  @Output() formSuccess = new EventEmitter<void>();
  @Output() formCancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private notificacion = inject(NotificacionService);
  private oPartidoService = inject(PartidoService);
  private oLigaService = inject(LigaService);
  private modalService = inject(ModalService);
  private sessionService = inject(SessionService);

  partidoForm!: FormGroup;
  error = signal<string | null>(null);
  submitting = signal(false);
  selectedLiga = signal<ILiga | null>(null);

  constructor() {
    effect(() => {
      const p = this.partido;
      if (p && this.partidoForm) {
        this.loadPartidoData(p);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();

    if (this.partido) {
      this.loadPartidoData(this.partido);
    }
  }

  private initForm(): void {
    this.partidoForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      rival: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      id_liga: [null, Validators.required],
      local: [null, Validators.required],
      resultado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    });
  }

  private loadPartidoData(partido: IPartido): void {
    this.partidoForm.patchValue({
      id: partido.id,
      rival: partido.rival,
      id_liga: partido.liga?.id,
      local: partido.local ? 1 : 0,
      resultado: partido.resultado,
    });
    if (partido.liga?.id) this.loadLiga(partido.liga.id);
  }

  private loadLiga(idLiga: number): void {
    this.oLigaService.get(idLiga).subscribe({
      next: (liga) => this.selectedLiga.set(liga),
      error: () => this.selectedLiga.set(null),
    });
  }

  get rival() {
    return this.partidoForm.get('rival');
  }

  get id_liga() {
    return this.partidoForm.get('id_liga');
  }

  get local() {
    return this.partidoForm.get('local');
  }

  get resultado() {
    return this.partidoForm.get('resultado');
  }

  openLigaFinderModal(): void {
    const ref = this.modalService.open<unknown, ILiga | null>(LigaAdminPlist);
    ref.afterClosed$.subscribe((liga: ILiga | null) => {
      if (liga?.id != null) {
        this.partidoForm.patchValue({ id_liga: liga.id });
        this.selectedLiga.set(liga);
        this.notificacion.success(`Liga seleccionada: ${liga.nombre}`);
      }
    });
  }

  onSubmit(): void {
    if (this.partidoForm.invalid) {
      this.notificacion.info('Por favor, complete todos los campos correctamente');
      return;
    }

    this.submitting.set(true);

    const partidoData: any = {
      rival: this.partidoForm.value.rival,
      liga: { id: Number(this.partidoForm.value.id_liga) },
      local: Number(this.partidoForm.value.local) === 1,
      resultado: this.partidoForm.value.resultado,
    };

    if (this.isEditMode && this.partido?.id) {
      partidoData.id = this.partido.id;
      this.oPartidoService.update(partidoData).subscribe({
        next: () => {
          this.notificacion.info('Partido actualizado exitosamente');
          this.submitting.set(false);
          this.formSuccess.emit();
        },
        error: (err: HttpErrorResponse) => {
          this.error.set('Error actualizando el partido');
          this.notificacion.error('Error actualizando el partido');
          console.error(err);
          this.submitting.set(false);
        },
      });
    } else {
      this.oPartidoService.create(partidoData).subscribe({
        next: () => {
          this.notificacion.info('Partido creado exitosamente');
          this.submitting.set(false);
          this.formSuccess.emit();
        },
        error: (err: HttpErrorResponse) => {
          this.error.set('Error creando el partido');
          this.notificacion.error('Error creando el partido');
          console.error(err);
          this.submitting.set(false);
        },
      });
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
