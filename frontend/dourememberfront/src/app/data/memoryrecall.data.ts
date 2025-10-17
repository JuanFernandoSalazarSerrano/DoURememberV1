import { MemoryRecallModel } from "../models/MemoryRecallModel";

  export const memoryRecalls: MemoryRecallModel[] = [
  {
    MemoryRecallId: 1,
    type: 'picture',
    MemoryRecallUrl: 'https://picsum.photos/id/57/367/267',
    groundTruthDescriptionSmall: 'A scenic mountain view',
    groundTruthDescriptionComplete: 'A beautiful landscape showing snow-capped mountains under a clear blue sky.'
  },
  {
    MemoryRecallId: 2,
    type: 'video',
    MemoryRecallUrl: 'https://picsum.photos/id/64/367/267',
    groundTruthDescriptionSmall: 'Funny animated bunny',
    groundTruthDescriptionComplete: 'A short animated video featuring a big bunny and his humorous adventures in the forest.'
  },
  {
    MemoryRecallId: 3,
    type: 'picture',
    MemoryRecallUrl: 'https://picsum.photos/id/950/4951/3301',
    groundTruthDescriptionSmall: 'Dog at the beach',
    groundTruthDescriptionComplete: 'A dog running along the shoreline with waves crashing in the background.'
  },
  {
    MemoryRecallId: 4,
    type: 'video',
    MemoryRecallUrl: 'https://picsum.photos/id/1025/4951/3350',
    groundTruthDescriptionSmall: 'Ocean waves',
    groundTruthDescriptionComplete: 'A relaxing video of ocean waves gently rolling onto the sandy beach.'
  }
];
