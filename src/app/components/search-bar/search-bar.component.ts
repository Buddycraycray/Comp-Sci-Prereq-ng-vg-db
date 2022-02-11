import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { } //methods from angular's api itself

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) { //recieves form as angular's form method; method that binds to html code to allow to search with ngForm and form methods functions
    this.router.navigate(['search', form.value.search]); //then passes through function as nav
  }

}
