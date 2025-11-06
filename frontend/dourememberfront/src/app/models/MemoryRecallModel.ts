import { User } from "./User";

export class MemoryRecallModel
{
  memoryrecallid: number = 0;
  type: 'video' | 'picture' = 'picture';
  memoryrecallurl: string = 'https://picsum.photos/id/129/4910/3252';
  groundtruthdescriptionsmall: string = '';
  groundtruthdescriptioncomplete: string = '';
  groundtruthfacts: string[] = [];
  keyentities: string = ''
  user: User = new User();
}
