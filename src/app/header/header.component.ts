import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  logStatus:any=true
  wish:any=0
  cart:any=0
  username:any=""


  constructor(private ds:DataService,private router:Router,private toastr:ToastrService){}


  ngOnInit() {
    if(sessionStorage.getItem('token')){
      this.logStatus=true
      this.username=sessionStorage.getItem('user')
    }
    else{
      this.logStatus=false
    }

    this.ds.wishCount.subscribe({                     // for badge - WIsh
      next:(res:any)=>{
        this.wish=res
      }
    })

    this.ds.cartCount.subscribe({                  // for badge - cart
      next:(res:any)=>{
        this.cart=res
      }
    })
  }

  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/log')
    this.toastr.info("User Logged out!!")
    this.ds.getCartCount()
    this.ds.getWishCount()
  }
  

  getSearchTerms(search:any){
    this.ds.searchKey.next(search)
  }

}
