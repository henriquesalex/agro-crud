import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface FarmStatistics {
  state: string;
  count: number;
  farmableArea: number;
  vegetationArea: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public dataSource: FarmStatistics[] = [];
  displayedColumns: string[] = ['state', 'count', 'farmableArea', 'vegetationArea'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {    
    this.loadStatistics();
  }

  loadStatistics() {
    this.http.get('http://localhost:3000/producers/statistics').subscribe(
      (data: any) => {
        this.processDataForTable(data);
      },
      (error) => {
        console.error('Error fetching statistics', error);
      }
    );
  }

  processDataForTable(data: any) {
    const farmsByState = data.farmsByState;
    const landUse = data.landUse;

    this.dataSource = farmsByState.map((item: any) => ({
      state: item.state,
      count: Number(item.count),
      farmableArea: Number(landUse.farmableArea),
      vegetationArea: Number(landUse.vegetationArea),
    }));
  }
}
