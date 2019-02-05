import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";

import { PaginatorService, Paginating } from "../services/paginator.service";
import { Planet } from "../services/planets.service";
import { Subject } from "rxjs";
import {Router} from "@angular/router";

import {SelectionModel} from '@angular/cdk/collections';


import {
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";

import { FETCH_NEXT_PLANETS_REQUEST } from "../actions/planetsList.actions";

import { Store, select } from "@ngrx/store";
@Component({
  selector: "app-plants-list-view",
  templateUrl: "./plants-list-view.component.html",
  styleUrls: ["./plants-list-view.component.css"]
})
export class PlantsListViewComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "diameter",
    "population",
    "surface_water",
    "orbital_period",
    "rotation_period"
  ];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  dataSource: MatTableDataSource<Planet>;
  selection = new SelectionModel<Planet>(false, []);

  error: any;
  next: string = null;

  searchTerm: Subject<string> = new Subject<string>();

  constructor(private store: Store<any>, private router: Router) {
    this.searchTerm
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(term => this.searchPlanet(term));

    this.initList();
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Planet, filter: string) =>
      data.name
        .trim()
        .toLocaleLowerCase()
        .includes(filter.trim().toLocaleLowerCase());
  }

  selectRow(ee){
    console.log(ee.url)

    const numberPattern = /planets\/\d+/g;

    console.log(ee.url.match( numberPattern ))
    this.router.navigate(ee.url.match( numberPattern ));
  }
  over() {
    console.log('over')
    
  }

  searchPlanet(term: any) {
    if (term.length > 0) {
      this.dataSource.filter = term.trim().toLowerCase();
    }
  }

  initList() {
    this.store.pipe(select("planetStorage")).subscribe(pS => {
      if (pS.next) {
        this.store.dispatch(new FETCH_NEXT_PLANETS_REQUEST(pS.next)); // cacheing next planets
      }
      this.dataSource = new MatTableDataSource<Planet>(pS.planetList);
      this.dataSource.paginator = this.paginator;
    });
  }
}
