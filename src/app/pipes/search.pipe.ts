import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: any,keyword: any) : any {
    const results:any=[]
    if(!products || keyword==""){
      return products
    }
    products.forEach((item:any)=>{
      if(item['title'].trim().toLowerCase().includes(keyword))
        results.pudh(item);
    }) 
    return results
  }
  


}
