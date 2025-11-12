import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDropCard } from '../doctor-drop-card/doctor-drop-card';
import { PatientsService } from '../../services/patientsService';
import { Doctor } from '../../models/Doctor';

@Component({
  selector: 'hero',
  imports: [DoctorDropCard, CommonModule],
  templateUrl: './hero.html',
})
export class Hero implements OnInit {
  doctors: Doctor[] = [];
  showDoctors = false;

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.patientsService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
      }
    });
  }

  onSearch(): void {
    this.showDoctors = true;
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n.charAt(0)).join('');
  }

    getMailtoLink(email: string): string {
      const subject = 'Join DoURemember';
      const body = 'Hi doctor, could you invite me to create an account in DoURemember?';
      return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
}
