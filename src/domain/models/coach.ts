export interface CoachDTO {
  id: number;
  name: string;
  age: number;
  nationality: string;
  photo: string;
  career: {
    team: string;
    start: string;
    end: string;
  }[];
}
