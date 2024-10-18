import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { SearchPipe } from '../pipes/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, HeaderComponent, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: any = []
  keyword: String = ""

  constructor(private data: DataService, private toastr: ToastrService) { }

  ngOnInit() {
    this.data.searchKey.subscribe({
      next: (res: any) => {
        this.keyword = res
      }
    })


    this.data.getProducts().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.products = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }



  addWish(product: any) {
    this.data.addToWish(product).subscribe({

      next: (res: any) => {
        this.toastr.success("Product Added To WishList!!")
        this.data.getWishCount()
      },
      error: (err: any) => {
        this.toastr.error(err.error)
      }
    })
  }



  addToCart(product: any) {
    this.data.addTocart(product).subscribe({
      next: (res: any) => {
        console.log(res)
        this.toastr.success(res)
        this.data.getCartCount()
      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error(err)
      }
    })
  }
}
