import { Component, OnInit } from '@angular/core';

import { StatisticsService } from 'src/app/services/statistics.service'; // Certifique-se de ajustar o caminho conforme necessário

interface Activity {
  count: string;
  ringColor: string;
  message: string; // Neste caso, message será usado para armazenar o nome das culturas
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'] // Adicione o arquivo de estilo se necessário
})
export class ActivityComponent implements OnInit {
  activity: Activity[] = [];

  constructor(private strategiesService: StatisticsService) { }

  ngOnInit(): void {
    this.strategiesService.getStatistics().subscribe(
      (data: { crops: any[]; }) => {
        this.updateActivityWithCrops(data.crops);
      },
      (error: any) => {
        console.error('Erro ao buscar dados', error);
      }
    );
  }

  updateActivityWithCrops(crops: any[]): void {
    this.activity = crops.map((crop, index) => ({
      count: crop.count, // Aqui você pode definir a lógica para o campo `count`, se necessário
      ringColor: this.getRingColor(index),
      message: crop.crop
    }));
  }


  getRingColor(index: number): string {
    // Implementar uma lógica para definir a cor do anel com base no índice
    const colors = ['ring-success', 'ring-primary', 'ring-info', 'ring-warning', 'ring-danger'];
    return colors[index % colors.length];
  }
}
