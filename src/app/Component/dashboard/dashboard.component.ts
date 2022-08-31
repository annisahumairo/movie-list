import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private subjectKeyUp = new Subject<any>();
  latestMovie :any;
  displayM="none";
  pickPoster:any;
  pickTitle:any;
  pickYear:any;
  pickType:any;
  search:any;

  constructor(
    private dataService :DataService,
    private route : Router
    ) { 
      this.search='Batman'
    }

  ngOnInit(): void {
    this.getLatestMovie();
    this.subjectKeyUp.pipe(debounceTime(1000)).subscribe((param)=>{
      console.log("this" + param);
      if(param!=''){
        this.dataService.getLatestMovie(param).subscribe(res=>{
          this.latestMovie= res.Search;
          // console.log(this.latestMovie);
        },err=>{
          console.log('Not able to get latest movie', err);
        })
      }else{
        this.getLatestMovie();
      }
      
    })
  }

  getLatestMovie(){
    this.dataService.getLatestMovie(this.search).subscribe(res=>{
      this.latestMovie= res.Search;
      // console.log(this.latestMovie);
    },err=>{
      console.log('Not able to get latest movie', err);
    })
  }

  openModal(poster : any, title : any, year : any, type : any){
    // console.log(poster);
    this.displayM="block";
    this.pickPoster= poster;
    this.pickTitle=title;
    this.pickYear= year;
    this.pickType=type;
  }
  closeModal(){
    this.displayM="none";
  }

  detailMovie(){
    this.route.navigate(['detail'],{
      state:{
        poster:this.pickPoster, 
        title:this.pickTitle,
        year:this.pickYear, 
        type:this.pickType}
    });
  }

  onSearch($event : any){
    this.search=$event.target.value;
    // this.dataService.getLatestMovie(this.search).subscribe(res=>{
    //   this.latestMovie= res.Search;
    //   // console.log(this.latestMovie);
    // },err=>{
    //   console.log('Not able to get latest movie', err);
    // })
    this.subjectKeyUp.next(this.search)
  }

}
