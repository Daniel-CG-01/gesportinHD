import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuotaService } from '../../../../service/cuota';
import { NotificacionService } from '../../../../service/notificacion';;
import { CuotaAdminDetail } from '../../../../component/cuota/admin/detail/detail';

@Component({
  selector: 'app-cuota-admin-delete-page',
  imports: [CuotaAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class CuotaAdminDeletePage {
  private route = inject(ActivatedRoute);
  private cuotaService = inject(CuotaService);
  private notificacion = inject(NotificacionService);

  id_cuota = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de cuota no válido');
      return;
    }
    this.id_cuota.set(id);
  }

  doDelete(): void {
    this.cuotaService.delete(this.id_cuota()).subscribe({
      next: () => {
        this.notificacion.info('Cuota eliminada');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando la cuota');
        this.notificacion.error('Error eliminando la cuota');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}
