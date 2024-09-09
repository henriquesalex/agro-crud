import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  imports: [DemoFlexyModule, MatCardModule, MatTableModule, MatButtonModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class FormsComponent implements OnInit {

  farm = {
    name: '',
    cpfOrCnpj: '',
    farmName: '',
    city: '',
    state: '',
    totalArea: '',
    farmableArea: '',
    vegetationArea: ''
  };
    selectedCrops: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private _router: Router) {  }

//   constructor(private _router: Router,) { }

  ngOnInit(): void {
    // const farmId = this.route.snapshot.paramMap.get('id');
    // this.loadFarmDetails(farmId);
  }

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onCheckboxChange(event: any, crop: string): void {
    if (event.checked) {
      // Adiciona o cultivo ao array se o checkbox foi marcado
      this.selectedCrops.push(crop);
    } else {
      // Remove o cultivo do array se o checkbox foi desmarcado
      const index = this.selectedCrops.indexOf(crop);
      if (index > -1) {
        this.selectedCrops.splice(index, 1);
      }
    }
  }

  // loadFarmDetails(farmId: any) {
  //   this.http.get(`http://localhost:3000/producers/${farmId}`).subscribe(
  //     (data) => {
  //       this.farm = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching farm details', error);
  //     }
  //   );
  // }

  onSave(farm: any): void {
    farm.totalArea = Number(farm.totalArea);
    farm.farmableArea = Number(farm.farmableArea);
    farm.vegetationArea = Number(farm.vegetationArea);
    farm.crops = this.selectedCrops;
    console.log('Saving farm', farm);
    

    this.http.post(`http://localhost:3000/producers/`, farm).subscribe(
      () => {
        
        // Request completed successfully
        
        this.onBack();
      },
      (error) => {
        console.error('Error saving farm', error);
      }
    );
  }
  
}
