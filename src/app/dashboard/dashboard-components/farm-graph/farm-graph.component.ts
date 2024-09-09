import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ApexChart, ChartComponent, ApexAxisChartSeries, ApexXAxis } from 'ng-apexcharts';

export interface activeusercardChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
}

@Component({
  selector: 'app-farm-graph',
  templateUrl: './farm-graph.component.html',
  styleUrls: ['./farm-graph.component.scss'],
})
export class FarmGraphComponent implements OnInit {
  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public activeusercardChartOptions!: Partial<activeusercardChartOptions> | any;

  constructor(private statisticsService: StatisticsService, private cdr: ChangeDetectorRef) { 
    this.activeusercardChartOptions = {};
  }

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(data => {
      this.updateChart(data);
    });
  }

  updateChart(data: any) {
    this.activeusercardChartOptions = {
      series: [
        { name: 'Farms by State', data: data.farmsByState.map((state: any) => state.count), color: "#00c292" },
        { name: 'Crops', data: data.crops.map((crop: any) => crop.count), color: "#c873f0" },
      ],
      xaxis: {
        categories: data.farmsByState.map((state: any) => state.state),
      },
      chart: {
        toolbar: { show: false },
        type: 'bar',
        height: 300,
      }
    };

    // Força a detecção de mudanças
    this.cdr.detectChanges();
  }
}
