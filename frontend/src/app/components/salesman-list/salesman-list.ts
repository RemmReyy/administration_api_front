import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Salesman } from '../../services/api.service';

@Component({
  selector: 'app-salesman-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salesman-list.html',
  styleUrls: ['./salesman-list.scss']
})
export class SalesmanListComponent implements OnInit {
  salesmen: Salesman[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSalesmen();
  }

  loadSalesmen(): void {
    this.loading = true;
    this.error = null;
    this.apiService.getAllSalesmen().subscribe({
      next: (data) => {
        this.salesmen = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading data';
        this.loading = false;
        console.error('Error loading salesmen:', err);
      }
    });
  }

  viewDetails(sid: number): void {
    this.router.navigate(['/salesman', sid]);
  }

  editSalesman(sid: number): void {
    this.router.navigate(['/salesman', sid, 'edit']);
  }

  deleteSalesman(sid: number): void {
    if (confirm('Are you sure you want to remove this salesman?')) {
      this.apiService.deleteSalesman(sid).subscribe({
        next: () => {
          this.loadSalesmen();
        },
        error: (err) => {
          this.error = 'Error deleting salesman';
          console.error('Error deleting salesman:', err);
        }
      });
    }
  }

  createNew(): void {
    this.router.navigate(['/salesman/new']);
  }
}
