import { Component, OnInit } from '@angular/core';
import { SportService } from './sports.service';
 
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {
  sports: any[] = [];
 
  constructor(private sportService: SportService) { }
 
  ngOnInit(): void {
    this.fetchSports();
  }
 
  fetchSports(): void {
    this.sportService.getSports().subscribe(
      (data: any) => {
        this.sports = data;
      },
      (error) => {
        console.error('Error fetching sports:', error);
      }
    );
  }
}
