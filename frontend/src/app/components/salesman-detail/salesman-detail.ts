import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Salesman, SocialPerformanceRecord } from '../../services/api.service';

@Component({
  selector: 'app-salesman-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salesman-detail.html',
  styleUrls: ['./salesman-detail.scss']
})
export class SalesmanDetailComponent implements OnInit {
  salesman: Salesman | null = null;
  records: SocialPerformanceRecord[] = [];
  loading = true;
  error: string | null = null;
  sid: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const sidParam = this.route.snapshot.paramMap.get('sid');
    if (sidParam) {
      this.sid = parseInt(sidParam, 10);
      this.loadData();
    }
  }

  loadData(): void {
    if (!this.sid) return;

    this.loading = true;
    this.error = null;

    this.apiService.getSalesman(this.sid).subscribe({
      next: (salesman) => {
        this.salesman = salesman;
        this.loadRecords();
      },
      error: (err) => {
        this.error = 'Error loading salesman data';
        this.loading = false;
        console.error('Error loading salesman:', err);
      }
    });
  }

  loadRecords(): void {
    if (!this.sid) return;

    this.apiService.getSalesmanRecords(this.sid).subscribe({
      next: (records) => {
        this.records = records;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading records';
        this.loading = false;
        console.error('Error loading records:', err);
      }
    });
  }

  editSalesman(): void {
    if (this.sid) {
      this.router.navigate(['/salesman', this.sid, 'edit']);
    }
  }

  deleteSalesman(): void {
    if (this.sid && confirm('Are you sure you want to remove this salesman')) {
      this.apiService.deleteSalesman(this.sid).subscribe({
        next: () => {
          this.router.navigate(['/salesman']);
        },
        error: (err) => {
          this.error = 'Error deleting salesman';
          console.error('Error deleting salesman:', err);
        }
      });
    }
  }

  addRecord(): void {
    if (this.sid) {
      this.router.navigate(['/salesman', this.sid, 'record', 'new']);
    }
  }

  editRecord(year: number): void {
    if (this.sid) {
      this.router.navigate(['/salesman', this.sid, 'record', year]);
    }
  }

  deleteRecord(year: number): void {
    if (this.sid && confirm('Are you sure you want to delete this entry?')) {
      this.apiService.deleteRecord(this.sid, year).subscribe({
        next: () => {
          this.loadRecords();
        },
        error: (err) => {
          this.error = 'Error deleting record';
          console.error('Error deleting record:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/salesman']);
  }
}
