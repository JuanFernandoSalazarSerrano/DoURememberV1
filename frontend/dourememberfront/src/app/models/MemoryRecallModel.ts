export class MemoryRecallModel
{
  MemoryRecallId: number = 0
  type: 'video' | 'picture' = 'picture';
  MemoryRecallUrl: string = 'https://picsum.photos/id/129/4910/3252'
  groundTruthDescriptionSmall: string = '';
  groundTruthDescriptionComplete: string = '';
  groundTruthFacts: string[] = [];
  keyEntities: { id: string; label: string; type: string; canonical: string; synonyms: string[] }[] = [];
}
