import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'detail-services',
    loadChildren: () => import('./pages/detail-services/detail-services.module').then( m => m.DetailServicesPageModule)
  },
  {
    path: 'detail-user',
    loadChildren: () => import('./pages/detail-user/detail-user.module').then( m => m.DetailUserPageModule)
  },
  {
    path: 'new-service-user',
    loadChildren: () => import('./pages/new-service-user/new-service-user.module').then( m => m.NewServiceUserPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
