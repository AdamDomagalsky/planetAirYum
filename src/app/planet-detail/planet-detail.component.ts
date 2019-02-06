import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { getPlanetItemById } from "../selectors/getPlanetById.selector";
import { Planet } from '../services/planets.service';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.css']
})
export class PlanetDetailComponent implements OnInit {

  isLoading = true;
  planetDetail: Planet;
  
  constructor(private router: Router, private store: Store<any>) {

    this.store.select(getPlanetItemById(this.router.url)).subscribe(planet => {
      if(planet){
        this.isLoading = false;
        this.planetDetail = planet
      }
    })

   }

  ngOnInit() {}

}
