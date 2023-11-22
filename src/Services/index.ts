import categories from './categories.json';
import clients from './clients.json';
import { ICategoryClient } from "../Models";

export const CategoriesService:()=>Promise<ICategoryClient[]> = ()=>{
  return new Promise(resolve => {
    setTimeout(()=>{

      console.log({categories})
      resolve(categories)
    },500)
  })
}

export const ClientsService:()=>Promise<ICategoryClient[]> = ()=>{
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(clients)
    },500)
  })
}
