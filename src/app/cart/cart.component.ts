import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,NgIf,CurrencyPipe,HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItem:any=[]
  amount:any=0
  offerStatus:boolean=false
  offerLink:boolean=true

  constructor (private ds:DataService , private toastr:ToastrService, private router:Router){}

  ngOnInit() {
    this.ds.getCart().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.cartItem=res
        this.amount=Math.ceil(this.cartItem.reduce((prev:any,item:any)=>prev+(item.price*item.quantity),0))
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


  removeItem(id:any){
    this.ds.deleteFromCart(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.toastr.success("Item Removed")
        this.ngOnInit()
        this.ds.getCartCount()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }

  increaseCartQuantity(id:any){
    this.ds.increaseQuantity(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.toastr.success(res)
        this.ngOnInit()
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }


  decreaseCartQuantity(id:any){
    this.ds.decreaseQuantity(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        // this.toastr.success(res)
        this.ngOnInit()
        this.ds.getCartCount()
        
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }


  emptyCart(){
    this.ds.emptyCart().subscribe({
      next:(res:any)=>{
        this.toastr.success(res)
        this.ngOnInit()
        console.log(res)
        this.ds.getCartCount()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }


  changeOfferStatus(){
    this.offerStatus=!this.offerStatus
    this.offerLink=!this.offerLink
  }

   


  amount20Percent(){
    const val=this.amount*0.1
    this.amount=Math.ceil(this.amount-val)
    this.offerStatus=false
  }

  amount50Percent(){
    const val=this.amount*0.2
    this.amount=Math.ceil(this.amount-val)
    this.offerStatus=false
  }

  amount70Percent(){
    const val=this.amount*0.4
    this.amount=Math.ceil(this.amount-val)
    this.offerStatus=false
  }

  checkout(){
    sessionStorage.setItem('total',JSON.stringify(this.amount))
    this.router.navigateByUrl('/check')
  }



}
