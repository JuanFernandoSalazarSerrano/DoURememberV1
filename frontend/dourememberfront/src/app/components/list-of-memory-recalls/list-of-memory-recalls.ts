import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'list-of-memory-recalls',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './list-of-memory-recalls.html'
})
export class ListOfMemoryRecalls {
  // Mock data - replace with actual service call
  memoryRecalls = [
    { id: 1, title: 'Memory Recall #1', date: '2024-01-15' },
    { id: 2, title: 'Memory Recall #2', date: '2024-01-20' },
    { id: 3, title: 'Memory Recall #3', date: '2024-01-25' },
  ];
}
