import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from '../../../../service/articulo';
import { NotificacionService } from '../../../../service/notificacion';;
import { ArticuloAdminDetail } from '../../../../component/articulo/admin/detail/detail';

@Component({
  selector: 'app-articulo-admin-delete-page',
  imports: [ArticuloAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class ArticuloAdminDeletePage {
  private route = inject(ActivatedRoute);
  private articuloService = inject(ArticuloService);
  private notificacion = inject(NotificacionService);

  id_articulo = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de artículo no válido');
      return;
    }
    this.id_articulo.set(id);
  }

  doDelete(): void {
    this.articuloService.delete(this.id_articulo()).subscribe({
      next: () => {
        this.notificacion.info('Artículo eliminado');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando el artículo');
        this.notificacion.error('Error eliminando el artículo');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}
