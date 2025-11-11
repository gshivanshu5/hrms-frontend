import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend
} from 'ng-apexcharts';
import { DashboardService } from '../../core/services/dashboard.service';
import { MatIconModule } from '@angular/material/icon';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  labels?: string[];
  responsive?: ApexResponsive[];
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
};

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, ChartComponent, MatIconModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  totalEmployees = 0;
  totalApplicants = 0;
  totalDepartments = 0;
  activeRoles = 0;

  applicantsByRole!: Partial<ChartOptions>;
  applicantsByStatus!: Partial<ChartOptions>;
  employeesByDepartment!: Partial<ChartOptions>;
  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getSummary().subscribe((res: any) => {
      this.totalEmployees = res.totalEmployees;
      this.totalApplicants = res.totalApplicants;
      this.totalDepartments = res.departmentCount;
      this.activeRoles = res.activeJobRoles;
      this.initCharts();
      this.loading = false;
    });
  }

  initCharts() {
    this.applicantsByRole = {
      series: [
        {
          name: 'Applicants',
          data: [10, 12, 8, 15] // mock, replace with backend later
        }
      ],
      chart: { type: 'bar', height: 220, toolbar: { show: false } },
      xaxis: { categories: ['Frontend', 'Backend', 'QA', 'BA'] },
      colors: ['#1e88e5'],
      title: { text: 'Applicants per Role', align: 'center' }
    };

    this.applicantsByStatus = {
      series: [56, 44],
      chart: { type: 'donut', height: 220 },
      labels: ['Shortlisted', 'New'],
      colors: ['#43a047', '#ff9800'],
      legend: { position: 'bottom' },
      title: { text: 'Applicants by Status', align: 'center' }
    };

    this.employeesByDepartment = {
      series: [
        {
          name: 'Employees',
          data: [6, 8]
        }
      ],
      chart: { type: 'bar', height: 220, toolbar: { show: false } },
      xaxis: { categories: ['Engineering', 'Marketing'] },
      colors: ['#8e24aa'],
      title: { text: 'Employees by Department', align: 'center' }
    };
  }
}
