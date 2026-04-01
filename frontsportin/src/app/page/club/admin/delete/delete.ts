import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../../../../service/club';
import { NotificacionService } from '../../../../service/notificacion';;
import { IClub } from '../../../../model/club';
import { HttpErrorResponse } from '@angular/common/http';
import { ClubAdminDetail } from '../../../../component/club/admin/detail/detail';

@Component({
  selector: 'app-club-admin-delete-page',
  imports: [ClubAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class ClubAdminDeletePage {
  
  private route = inject(ActivatedRoute);
  private oClubService = inject(ClubService);
  private notificacion = inject(NotificacionService);

  oClub = signal<IClub | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  id_club = signal<number>(0);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_club.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_club())) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }    
  }

  doDelete() {
    this.oClubService.delete(this.id_club()).subscribe({
      next: (data: any) => {
        this.notificacion.info('Club eliminado');
        console.log('Club eliminado');
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error eliminando el club');
        this.notificacion.error('Error eliminando el club');
        console.error(err);
      },
    });
  }

  doCancel() {    
    window.history.back();
  }
}
