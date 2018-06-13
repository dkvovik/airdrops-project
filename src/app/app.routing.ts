import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FindedAirdropPageComponent } from './finded-airdrop-page/finded-airdrop-page.component';
import { AdminModule } from './admin/admin.module';


export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'upcoming', component: FindedAirdropPageComponent},
  {path: 'active', component: FindedAirdropPageComponent},
  {path: 'past', component: FindedAirdropPageComponent},
  {
    path: 'admin',
    // loadChildren: './admin/admin.module#AdminModule'
    loadChildren: () => AdminModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
