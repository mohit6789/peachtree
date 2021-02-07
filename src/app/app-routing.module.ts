import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'transactions',
    loadChildren: () =>
      import('./pages/transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
  },
  {
    path: '**',
    redirectTo: '/transactions',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
