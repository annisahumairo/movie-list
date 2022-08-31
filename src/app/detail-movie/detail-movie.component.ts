import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss']
})
export class DetailMovieComponent implements OnInit {
  data :any;
  poster:any;
  year:any;
  title:any;
  type:any;

  constructor(
    private route:Router
  ) {
    this.data= this.route.getCurrentNavigation()?.extras;
    // console.log(this.data['state'].poster);
    this.poster=this.data['state'].poster;
    this.year=this.data['state'].year;
    this.title=this.data['state'].title;
    this.type=this.data['state'].type;

    
   }

  ngOnInit(): void {
  }

  backDashboard(){
    this.route.navigate(['dashboard']);
  }

}
