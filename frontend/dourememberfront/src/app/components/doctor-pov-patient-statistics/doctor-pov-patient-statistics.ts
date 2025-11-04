import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { testAiResponses } from '../../data/airesponse.data';

@Component({
  selector: 'doctor-pov-patient-statistics',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './doctor-pov-patient-statistics.html'
})

export class DoctorPovPatientStatistics {
  aiResponse = testAiResponses[0];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: testAiResponses.map((_, index) => `Session ${index + 1}`),
    datasets: [
      {
        label: 'Remember Score',
        data: testAiResponses.map(response => response.rememberScore),
        backgroundColor: 'rgba(245, 130, 31, 0.2)',
        borderColor: '#F5821F',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#F5821F',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };
}
