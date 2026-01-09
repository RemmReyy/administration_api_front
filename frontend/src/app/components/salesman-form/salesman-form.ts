import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Salesman } from '../../services/api.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-salesman-form',
  templateUrl: './salesman-form.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./salesman-form.scss']
})
export class SalesmanFormComponent implements OnInit {
  salesman: Salesman = {
    firstname: '',
    lastname: ''
  };
  isEditMode = false;
  sid: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const sidParam = this.route.snapshot.paramMap.get('sid');
    if (sidParam && sidParam !== 'new') {
      this.sid = parseInt(sidParam, 10);
      this.isEditMode = true;
      this.loadSalesman();
    }
  }

  loadSalesman(): void {
    if (this.sid) {
      this.loading = true;
      this.apiService.getSalesman(this.sid).subscribe({
        next: (data) => {
          this.salesman = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error loading salesman data';
          this.loading = false;
          console.error('Error loading salesman:', err);
        }
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = null;

    if (this.isEditMode && this.sid) {
      this.apiService.updateSalesman(this.sid, this.salesman).subscribe({
        next: () => {
          this.router.navigate(['/salesman', this.sid]);
        },
        error: (err) => {
          this.error = 'Error updating salesman';
          this.loading = false;
          console.error('Error updating salesman:', err);
        }
      });
    } else {
      this.apiService.createSalesman(this.salesman).subscribe({
        next: (created) => {
          this.router.navigate(['/salesman', created.sid]);
        },
        error: (err) => {
          this.error = 'Error creating salesman';
          this.loading = false;
          console.error('Error creating salesman:', err);
        }
      });
    }
  }

  cancel(): void {
    if (this.isEditMode && this.sid) {
      this.router.navigate(['/salesman', this.sid]);
    } else {
      this.router.navigate(['/salesman']);
    }
  }
}
