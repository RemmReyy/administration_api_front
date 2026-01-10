import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, SocialPerformanceRecord } from '../../services/api.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-record-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './record-form.html',
  styleUrls: ['./record-form.scss']
})
export class RecordFormComponent implements OnInit {
  record: SocialPerformanceRecord = {
    sid: 0,
    year: new Date().getFullYear(),
    targetValue: 0,
    actualValue: 0,
    bonus: 0
  };
  isEditMode = false;
  sid = 0;
  year: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const sidParam = this.route.snapshot.paramMap.get('sid');
    const yearParam = this.route.snapshot.paramMap.get('year');

    if (sidParam) {
      this.sid = parseInt(sidParam, 10);
      this.record.sid = this.sid;
    }

    if (yearParam && yearParam !== 'new') {
      this.year = parseInt(yearParam, 10);
      this.isEditMode = true;
      this.loadRecord();
    }
  }

  loadRecord(): void {
    if (this.sid && this.year) {
      this.loading = true;
      this.apiService.getSalesmanRecords(this.sid).subscribe({
        next: (records) => {
          const found = records.find(r => r.year === this.year);
          if (found) {
            this.record = found;
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error loading record';
          this.loading = false;
          console.error('Error loading record:', err);
        }
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = null;

    if (this.isEditMode && this.year) {
      this.apiService.updateRecord(this.sid, this.year, this.record).subscribe({
        next: () => {
          this.router.navigate(['/salesman', this.sid]);
        },
        error: (err) => {
          this.error = 'Error updating record';
          this.loading = false;
          console.error('Error updating record:', err);
        }
      });
    } else {
      this.apiService.createRecord(this.sid, this.record).subscribe({
        next: () => {
          this.router.navigate(['/salesman', this.sid]);
        },
        error: (err) => {
          this.error = 'Error creating record';
          this.loading = false;
          console.error('Error creating record:', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/salesman', this.sid]);
  }
}
