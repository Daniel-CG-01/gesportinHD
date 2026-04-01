import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../../service/notificacion';;
import { PartidoService } from '../../../../service/partido';
import { IPartido } from '../../../../model/partido';
import { PartidoAdminForm } from '../../../../component/partido/admin/form/form';

@Component({
  selector: 'app-partido-admin-edit-page',
  imports: [CommonModule, PartidoAdminForm],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class PartidoAdminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private partidoService = inject(PartidoService);
  private notificacion = inject(NotificacionService);

  id_partido = signal<number>(0);
  loading = signal(true);
  error = signal<string | null>(null);
  partido = signal<IPartido | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam || idParam === '0') {
      this.error.set('ID de partido no válido');
      this.loading.set(false);
      return;
    }
    const id = Number(idParam);
    if (isNaN(id)) {
      this.error.set('ID de partido no válido');
      this.loading.set(false);
      return;
    }
    this.id_partido.set(id);
    this.loadPartido();
  }

  private loadPartido(): void {
    this.partidoService.get(this.id_partido()).subscribe({
      next: (data) => {
        this.partido.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error cargando el partido');
        this.notificacion.error('Error cargando el partido');
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  onFormSuccess(): void {
    this.router.navigate(['/partido']);
  }

  onFormCancel(): void {
    this.router.navigate(['/partido']);
  }
}
