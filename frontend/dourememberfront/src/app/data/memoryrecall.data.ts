import { MemoryRecallModel } from "../models/MemoryRecallModel";

  export const memoryRecalls: MemoryRecallModel[] = [
    {
      MemoryRecallId: 1,
      type: 'picture',
      MemoryRecallUrl: 'https://picsum.photos/id/57/367/267',
      groundTruthDescriptionSmall: 'A scenic mountain view',
      groundTruthDescriptionComplete: 'A beautiful landscape showing snow-capped mountains under a clear blue sky.',
      groundTruthFacts: [
        "mountains (location)",
        "snow (weather)",
        "clear sky (condition)",
        "daytime (time-of-day)"
      ],
      keyEntities: [
        {"id":"e1","label":"mountains","type":"location","canonical":"mountains","synonyms":["peaks","alps"]},
        {"id":"e2","label":"snow","type":"weather","canonical":"snow","synonyms":["snow-capped","snowy"]},
        {"id":"e3","label":"clear sky","type":"condition","canonical":"clear sky","synonyms":["blue sky","sunny"]}
      ]
    },
    {
      MemoryRecallId: 2,
      type: 'video',
      MemoryRecallUrl: 'https://picsum.photos/id/64/367/267',
      groundTruthDescriptionSmall: 'Funny animated bunny',
      groundTruthDescriptionComplete: 'A short animated video featuring a big bunny and his humorous adventures in the forest.',
      groundTruthFacts: [
        "bunny (animal)",
        "forest (location)",
        "animation (media-type)"
      ],
      keyEntities: [
        {"id":"e1","label":"bunny","type":"animal","canonical":"bunny","synonyms":["rabbit","hare"]},
        {"id":"e2","label":"forest","type":"location","canonical":"forest","synonyms":["woods","woodland"]},
        {"id":"e3","label":"animation","type":"media-type","canonical":"animation","synonyms":["animated","cartoon"]}
      ]
    },
    {
      MemoryRecallId: 3,
      type: 'picture',
      MemoryRecallUrl: 'https://picsum.photos/id/950/4951/3301',
      groundTruthDescriptionSmall: 'Dog at the beach',
      groundTruthDescriptionComplete: 'A pug dog running along the shoreline with waves crashing in the background.',
      groundTruthFacts: [
        "dog (animal)",
        "beach (location)",
        "waves (nature)",
        "shoreline (location)",
        "pug (animal)"
      ],
      keyEntities: [
        {"id":"e1","label":"dog","type":"animal","canonical":"dog","synonyms":["canine","pet"]},
        {"id":"e2","label":"beach","type":"location","canonical":"beach","synonyms":["seashore","coast"]},
        {"id":"e3","label":"waves","type":"nature","canonical":"waves","synonyms":["surf","breakers"]},
        {"id":"e4","label":"shoreline","type":"location","canonical":"shoreline","synonyms":["waterline","coast"]}
      ]
    },
    {
      MemoryRecallId: 4,
      type: 'video',
      MemoryRecallUrl: 'https://picsum.photos/id/1025/4951/3350',
      groundTruthDescriptionSmall: 'Ocean waves',
      groundTruthDescriptionComplete: 'A relaxing video of ocean waves gently rolling onto the sandy beach.',
      groundTruthFacts: [
        "ocean (location)",
        "waves (nature)",
        "sandy beach (location)",
        "daytime (time-of-day)"
      ],
      keyEntities: [
        {"id":"e1","label":"ocean","type":"location","canonical":"ocean","synonyms":["sea","waters"]},
        {"id":"e2","label":"waves","type":"nature","canonical":"waves","synonyms":["surf","breakers"]},
        {"id":"e3","label":"sandy beach","type":"location","canonical":"sandy beach","synonyms":["beach","shore"]}
      ]
    }
  ];
