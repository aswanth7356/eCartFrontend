import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9!@]+')]]
  })

  constructor(private fb:FormBuilder, private ds:DataService , private toastr:ToastrService , private router:Router){}

  submitted(e:any){
    console.log(this.logForm.value)
    this.ds.userLogin(this.logForm.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        sessionStorage.setItem('token',res.token)
        sessionStorage.setItem('user',res.username)
        this.toastr.success("Login Successfull")
        this.logForm.reset()
        this.router.navigateByUrl('/')
        this.ds.getCartCount()
        this.ds.getWishCount()
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }

}
