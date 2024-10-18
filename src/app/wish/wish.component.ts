import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink,HeaderComponent],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent implements OnInit{

  wishListItem:any=[]
  // cartItems:any[]


  constructor(private ds:DataService , private toastr:ToastrService){}


  ngOnInit() {
    this.ds.getWish().subscribe({
      next:(res:any)=> {
        console.log(res)
        this.wishListItem=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


  removeFromWish(id:any){
    this.ds.deleteWishItems(id).subscribe({
      next:(res:any)=>{
        this.toastr.success("Item Removed From WishLIst!!")
        this.ngOnInit()
        this.ds.getWishCount()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }



  addToCart(item:any){
    this.ds.addTocart(item).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.toastr.success(res)
        this.removeFromWish(item._id)
        this.ngOnInit()
        this.ds.getCartCount()
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error(err)
      }
    })
  }
}
