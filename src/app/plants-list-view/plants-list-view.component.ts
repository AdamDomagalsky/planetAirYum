import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";

import { PaginatorService, Paginating } from "../services/paginator.service";
import { PlanetsService, Planet } from "../services/planets.service";

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
  previous = 0
  next = 2
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   console.log(setPageSizeOptionsInput);
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(",aaa").map(str => +str);
  // }


  constructor(
    private paginator: PaginatorService,
    private planetsService: PlanetsService
  ) {
    this.pager = <Paginating>{};
  }

  ngOnInit() {
    this.getPlanetsArray(1);
  }

  getPlanetsArray(page: number = 1) {
    this.planetsService.getPlanets().subscribe(
      data => {
        console.log(data);
        this.allItems = data["results"];
        this.length = data.count;
        this.previous = data.previous
        this.next = data.next
        this.setPage(page);
      },
      error => (this.error = error)
    );
  }

  setPage(page: number = 1) {
    if (page < 1 || page > this.pager.totalPages + 1) {
      return;
    }
    this.pager = this.paginator.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    
  }
}
