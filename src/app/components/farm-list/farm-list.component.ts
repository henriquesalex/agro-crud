import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';




export interface Farm {
  id: number;
  name: string;
  city: string;
  state: string;
}

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.scss'],
  imports: [DemoFlexyModule, MatCardModule, MatTableModule, MatButtonModule],
  standalone: true,
})
export class FarmListComponent implements OnInit {

  public farms: Farm[] = [];
  displayedColumns: string[] = ['name', 'city', 'state', 'action', 'delete'];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadFarms();
  }

  loadFarms() {
    this.http.get<Farm[]>('http://localhost:3000/producers').subscribe(
      (data: Farm[]) => {
        this.farms = data;
      },
      (error) => {
        console.error('Error fetching farms', error);
      }
    );
  }

  viewFarmDetails(farmId: number) {
    this.router.navigate(['/farm-details', farmId]);  // Navega para a página de detalhes da fazenda
  }

  deleteFarm(farmId: number) {
    this.http.delete(`http://localhost:3000/producers/${farmId}`).subscribe(
        (      response: any) => {
        console.log('Farm deletada com sucesso!', response);
        // Recarrega a página após a exclusão
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/farm-list']);
        });
      },
        (      error: any) => {
        console.error('Erro ao deletar farm!', error);
      }
    );
  }
}
