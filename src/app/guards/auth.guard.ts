import { CanActivateFn } from '@angular/router';
import { DataService } from '../services/data.service';
import { inject, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



export const authGuard: CanActivateFn = (route, state) => {
  const data=inject(DataService)
  const router=inject(Router)
  const toastr=inject(ToastrService)


  if(data.isLoggedIn()){
    return true;
  }
  else{
    router.navigateByUrl('/log')
    toastr.warning("Please Login First!!")
    return false
  }
};
 