import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  wishCount:any=new BehaviorSubject(0)                  /* Badge set cheyyunna sambavam */
  cartCount:any=new BehaviorSubject(0)
  searchKey:any=new BehaviorSubject("")


  
  // base_url = "http://localhost:3000"
  base_url = "https://ecartbackend-y61k.onrender.com"

  constructor(private http: HttpClient) { 
    this.getWishCount()
    this.getCartCount()
  }


  getProducts() {
    return this.http.get(`${this.base_url}/products`)
  }


  userRegistration(data: any) {
    return this.http.post(`${this.base_url}/reg`, data)
  }


  userLogin(data:any) {
    return this.http.post(`${this.base_url}/log`,data)
  }


  getSpecificProduct(id:any){
    return this.http.get(`${this.base_url}/product/${id}`)
  }

  

  appendTokenToHeader(){
    const token=sessionStorage.getItem('token')
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('Authorization', `Bearer ${token}`)
    }
    return {headers}
  }


  // wishlist

  addToWish(data:any){
    return this.http.post(`${this.base_url}/wishlist`,data,this.appendTokenToHeader())
  }

  getWish(){
    return this.http.get(`${this.base_url}/wishlist`,this.appendTokenToHeader())
  }

  deleteWishItems(id:any){
    return this.http.delete(`${this.base_url}/wishlist/${id}`,this.appendTokenToHeader())
  }

  getWishCount(){
    this.getWish().subscribe({
      next:(res:any)=>{
        this.wishCount.next(res.length)
      }
    })
  }





  // cart

  addTocart(data:any){
    return this.http.post(`${this.base_url}/cart`,data,this.appendTokenToHeader())
  }

  getCart(){
    return this.http.get(`${this.base_url}/cart`,this.appendTokenToHeader())
  }

  deleteFromCart(id:any){
    return this.http.delete(`${this.base_url}/cart/${id}`,this.appendTokenToHeader())
  }

  increaseQuantity(id:any){
    return this.http.get(`${this.base_url}/inccart/${id}`,this.appendTokenToHeader())
  }

  decreaseQuantity(id:any){
    return this.http.get(`${this.base_url}/deccart/${id}`,this.appendTokenToHeader())
  }

  emptyCart(){
    return this.http.delete(`${this.base_url}/emptyCart`,this.appendTokenToHeader())
  }


  getCartCount(){
    this.getCart().subscribe({
      next:(res:any)=>{
        this.cartCount.next(res.length)
      }
    })
  }


  // Guard

  isLoggedIn(){
    if(sessionStorage.getItem('token')){
      return true
    }
    else{
      return false
    }
  }


  
}