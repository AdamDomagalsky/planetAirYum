import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";

import { PaginatorService, Paginating } from "../services/paginator.service";
import { PlanetsService, Planet } from "../services/planets.service";
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, map, subscribeOn } from 'rxjs/operators';

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
  pagedItems: Array<Planet>;
  pager: Paginating;
  error: any;
  previous: string = null
  next: string = null
  // MatPaginator Inputs
  length = 100;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize= this.pageSizeOptions[0];

  // MatPaginator Output
  pageEvent: PageEvent;
  count$: Observable<number>;
  planetStorage$: Observable<any>;

  searchTerm: Subject<string> = new Subject<string>();
  value: boolean = false;


  constructor(
    private store: Store<any>,
    private paginator: PaginatorService,
    private planetsService: PlanetsService
  ) {
    this.pager = <Paginating>{};
    this.count$ = store.pipe(select('counter'));
    this.value;

    // this.searchTerm.subscribe( tekst => console.log(tekst))

    this.searchTerm.pipe(
      debounceTime(200),
      distinctUntilChanged(),
    ).subscribe(term => this.searchPlanet(term))

    store.pipe(select('planetStorage'))
      .subscribe( pS => {
        if (pS.next) {
          this.store.dispatch(new FETCH_NEXT_PLANETS_REQUEST(pS.next)) // cacheing next planets
        }
        this.allItems = pS.planetList
        this.length = pS.count
        this.previous = pS.previous
        this.next = pS.next
        this.setPage();
      });
  }

  onPaginateChange(event){
    this.setPage(event.pageIndex+1, event.pageSize)
  }

  ngOnInit() { }

  searchPlanet(term: any) {
    if (term.length > 0) {
      let result = this.allItems.filter(element => element.name.toLocaleLowerCase().includes(term))
      this.setPage(result)
      this.length = result.length
      this.value = true
    } else {
      this.clearSearch()
    }
    
  }

  clearSearch(){
    this.length = this.allItems.length
    this.value = false
    this.setPage(this.allItems)
    console.log('czysci')
  }

  increment() {
    this.store.dispatch(new Increment());
  }
 
  decrement() {
    this.store.dispatch(new Decrement());
  }
 
  reset() {
    this.store.dispatch(new Reset());
  }

  setPage(ItemsArr: Array<Planet>= this.allItems, page: number = 1, pageSize: number = this.pageSizeOptions[0]) {
    if (page < 1 || page > this.pager.totalPages + 1) {
      return;
    }

    this.pager = this.paginator.getPager(this.length, page, pageSize);
    this.pagedItems = ItemsArr.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
