import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard/dashboard').then(m => m.Dashboard),

    children:[
        {
            path: 'trending',
            loadComponent: () => import('./gifs/pages/trending/trending').then(m => m.Trending),
          },
          {
            path: 'search',
            loadComponent: () => import('./gifs/pages/search/search').then(m => m.Search),
          },
          
        {
          path: "**", 
          redirectTo: 'dashboard',
        }
          ],  
},
  {
    path: "**", 
    redirectTo: 'dashboard',
  }
];
