import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";

import { PaginatorService, Paginating } from "../services/paginator.service";
import { PlanetsService, Planet } from "../services/planets.service";
import { Observable } from 'rxjs';
import { Increment, Decrement, Reset } from '../actions/counter.actions';
import { FETCH_NEXT_PLANETS_REQUEST } from '../actions/planetsList.actions';

import { Store, select } from '@ngrx/store';
@Component({
  selector: "app-plants-list-view",
  templateUrl: "./plants-list-view.component.html",
  styleUrls: ["./plants-list-view.component.css"]
})
export class PlantsListViewComponent implements OnInit {
  private allItems: Array<Planet>;
  pager: Paginating;
  pagedItems: Array<Planet>;
  error: any;
  previous: string = null
  next: string = null
  // MatPaginator Inputs
  length = 100;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize= this.pageSizeOptions[0];

  // MatPaginator Output
  pageEvent: PageEvent;
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   console.log(setPageSizeOptionsInput);
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(",aaa").map(str => +str);
  // }
  count$: Observable<number>;
  planetStorage$: Observable<any>;


  constructor(
    private store: Store<any>,
    private paginator: PaginatorService,
    private planetsService: PlanetsService
  ) {
    this.pager = <Paginating>{};
    this.count$ = store.pipe(select('counter'));

    store.pipe(select('planetStorage'))
      .subscribe( pS => {
                console.log(pS);
        this.allItems = pS.planetList
        this.length = pS.count;
        this.previous = pS.previous
        this.next = pS.next
        this.setPage();
        if (pS.next) {
          this.store.dispatch(new FETCH_NEXT_PLANETS_REQUEST(pS.next)) // cacheing next planets
        }
      });

  }

  onPaginateChange(event){
    this.setPage(event.pageIndex+1, event.pageSize)
  }

  ngOnInit() { }

  increment() {
    this.store.dispatch(new Increment());
  }
 
  decrement() {
    this.store.dispatch(new Decrement());
  }
 
  reset() {
    this.store.dispatch(new Reset());
  }

  setPage(page: number = 1, pageSize: number = this.pageSizeOptions[0]) {
    if (page < 1 || page > this.pager.totalPages + 1) {
      return;
    }
    this.pager = this.paginator.getPager(this.length, page, pageSize);
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
