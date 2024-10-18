import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{

  pid: any = 0
  product:any={}

  constructor(private ar: ActivatedRoute , private ds:DataService) {

    this.ar.params.subscribe({
      next: (res: any) => {
        console.log(res)
        this.pid=res.id
      }
    })
  }


  ngOnInit() {
    this.ds.getSpecificProduct(this.pid).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.product=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


}
