import { Component, Input, OnDestroy, OnInit, ViewChild, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { PatientsService } from './../../services/patientsService';
import { GroundTruthResponse } from '../../models/GroundTruthResponse';
import { ActivatedRoute, RouterLink } from "@angular/router";


@Component({
  selector: 'doctor-pov-patient-statistics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterLink],
  templateUrl: './doctor-pov-patient-statistics.html'
})
export class DoctorPovPatientStatistics implements OnInit, OnDestroy {

  patientId!: number;

  index!: number;

  // aiResponses is now a signal
  public aiResponses = signal<GroundTruthResponse[]>([]);

  // convenience computed for template: first response or undefined
  public firstResponse = computed(() => this.aiResponses()[0]);

  private sub: Subscription | null = null;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private readonly PatientsService: PatientsService, private readonly route: ActivatedRoute) {
      this.route.paramMap.subscribe(params => {
        this.index = +(params.get('index') || -1)
        this.patientId = +(params.get('patientid') || -1)
        console.log(this.index, 'ABC')
      })
      }

  ngOnInit(): void {

    const userIdToFetch = typeof this.patientId === 'number' ? this.patientId : 1;

    // Choose API method based on presence of patientId (keeps your original branching)
    if (this.index === undefined || this.index === null || this.index === -1) {
      this.sub = this.PatientsService.getAllUserSessionsById(userIdToFetch)
        .subscribe(list => this.handleResponseArray(list));
    } else {
      this.sub = this.PatientsService.findAllUserSessionsByUserIdPage(userIdToFetch, (this.index - 1))
        .subscribe(list =>
          this.handleResponseArray(list.content)
        );
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // Chart options (static)
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

  // lineChartData will be rebuilt when signal updates
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  // --- Helpers ---

  private handleResponseArray(raw: any[]) {
    if (!Array.isArray(raw)) {
      console.warn('Expected array response for aiResponses', raw);
      this.aiResponses.set([]);
      this.updateChart();
      return;
    }

    // parse individual items
    const parsed = raw.map(item => this.parseSingle(item));
    this.aiResponses.set(parsed); // set the signal
    this.updateChart();
  }

  private parseSingle(item: any): GroundTruthResponse {
    const copy: any = { ...item };

    // fields that sometimes arrive as JSON-encoded strings
    const jsonArrayFields = [
      'presentEntities',
      'missingEntities',
      'incorrectDetails',
      'confabulatedDetails'
    ];

    jsonArrayFields.forEach(field => {
      const val = copy[field];
      if (typeof val === 'string') {
        try {
          const p = JSON.parse(val);
          copy[field] = Array.isArray(p) ? p : [];
        } catch (e) {
          // fall back to an attempt to strip brackets and split by comma (very defensive)
          const stripped = val.replace(/^\[|\]$/g, '').trim();
          copy[field] = stripped ? stripped.split(/\s*,\s*/).map((s: string) => s.replace(/^"|"$/g, '').trim()) : [];
        }
      } else if (Array.isArray(val)) {
        copy[field] = val;
      } else {
        copy[field] = [];
      }
    });

    // numeric fields ensure number type
    const numericFields = ['rememberScore', 'presence', 'accuracy', 'omission', 'commission'];
    numericFields.forEach(f => {
      copy[f] = Number(copy[f]) || 0;
    });

    return copy as GroundTruthResponse;
  }

  private updateChart(): void {
    const responses = this.aiResponses();

    if (!responses?.length) {
      this.lineChartData = { labels: [], datasets: [] };
      this.chart?.update();
      return;
    }

    const labels = responses.map((r, i) => r.id ? `#${r.id}` : `Session ${i + 1}`);
    const rememberData = responses.map(r => r.rememberScore ?? 0);
    // keep presence on same 0-10 scale (optional scaling)
    const presenceData = responses.map(r => (r.presence ?? 0) * 10);

    this.lineChartData = {
      labels,
      datasets: [
        {
          label: 'Remember Score',
          data: rememberData,
          // you can keep these styles or remove them if you prefer CSS defaulting
          backgroundColor: 'rgba(245,130,31,0.2)',
          borderColor: '#F5821F',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#F5821F',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'Presence (scaled x10)',
          data: presenceData,
          borderDash: [6, 4],
          borderColor: '#4F7380',
          borderWidth: 1.5,
          fill: false,
          tension: 0.3,
          pointRadius: 3
        }
      ]
    };

    // redraw chart (async to ensure view children are ready)
    setTimeout(() => this.chart?.update(), 0);
  }
}
