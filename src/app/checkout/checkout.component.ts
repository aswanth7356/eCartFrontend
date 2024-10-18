import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxPayPalModule } from 'ngx-paypal';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgxPayPalModule,HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  total: any = 0
  checkoutStatus: any = false
  payPalConfig?: IPayPalConfig;



  payForm: any = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-91@]+')]],
    address: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-91@ ]+')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]]
  })

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router,private ds:DataService) {
    this.total = sessionStorage.getItem('total')
  }


  ngOnInit(): void {
    this.initConfig()
  }


  checkoutClick() {
    if (this.payForm.invalid) {
      this.toastr.warning("Invalid Data!!")
    }
    else {
      console.log(this.payForm.value)
      this.checkoutStatus = true
    }
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




   initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.total
              }
            }
          }
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
        this.toastr.success("Payment Successfull!!")
        sessionStorage.removeItem('total')
        this.emptyCart()
        this.router.navigateByUrl('/')
        this.payForm.reset()
        this.checkoutStatus=false

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;
        this.toastr.warning("Checkout Cancelled!!")
        this.router.navigateByUrl('/cart')
        this.payForm.reset()
        this.checkoutStatus=false

      },
      onError: err => {
        console.log('OnError', err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      }
    };
  }


}


