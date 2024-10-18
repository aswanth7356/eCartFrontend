import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {

  regForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]+')]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]+')]]
  })

  constructor(private fb: FormBuilder, private ds: DataService , private toastr:ToastrService , private route:Router) { }


  submitted(e: any) {
    e.preventDefault()
    console.log(this.regForm.value)
    this.ds.userRegistration(this.regForm.value).subscribe({
      next: (res: any)=>{
        this.toastr.success("Registration Successfull")
        this.regForm.reset()
        this.route.navigateByUrl('/log')
        
      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error("Something went wrong")
      }
    })
  }

}
