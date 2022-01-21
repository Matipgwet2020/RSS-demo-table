import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
//import 'rxjs/operator/map'; 
import {map} from 'rxjs/operators';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.scss']
})
export class GrapheComponent implements OnInit {

  employees: Observable<Employee[]>;
  emp: Observable<Employee[]>;
  statut = new Array("deploye","en cours","xxx");
  i: number;
  employee: Employee = new Employee();
  val1 = new Set();
  val2 = new Set();

  //chart; 

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.reloadData(2);
      
  }

  reloadData(i:number) {
    this.employees = this.employeeService.getEmployeesList();
    this.employeeService.getListeEmployee(this.statut[i])
    .subscribe(data => {
      console.log(data)
      console.log(data.length)
      console.log(data[0])

      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        this.val1.add(parseInt(data[i].valeur1))
        this.val2.add(parseInt(data[i].valeur2))
      }
      console.log(this.val1);
      //console.log(Array.from(this.val1))

      console.log(this.val2);
      //console.log(Array.from(this.val2))



      
    }, error => console.log(error));


    Highcharts.chart('container', this.options);
  }


  public options: any = {
    
    Chart: {
      type: 'line',
      height: 700
    },
    title: {
      text: 'Valeur'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.val1,
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
  yAxis: {
    categories: this.val2,
    tickmarkPlacement: 'on',
    title: {
        enabled: false
    }
},
    series: [ {
      //type: 'pie',
      name: 'Valeur1',
      data: [4, 20, 60, 30]
  } ,  {
     //type: 'pie',
      name: 'Valeur2',
      data: [18, 31, 54, 156]
  } /* , {
     //type: 'pie',
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
  } */]
  }

 
 

}

