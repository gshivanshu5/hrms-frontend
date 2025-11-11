import { Component, Input, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() rows: any[] = [];

  displayedColumns: string[] = [];

  ngOnChanges() {
    this.displayedColumns = this.columns.map(c => c.key);
  }
}
