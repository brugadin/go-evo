import { IntersectionData, IntersectionGroupData } from './intersection.model';

export class IntersectionGroup implements IntersectionGroupData {
    readonly intersections: IntersectionData[];

    readonly liberties: number;

    constructor(data: IntersectionGroupData) {
      this.intersections = data.intersections;
      this.liberties = data.liberties;
    }

    isIntersectionInGroup = (
      intersection: IntersectionData,
    ): boolean => (this.intersections
      .findIndex(
        (item: IntersectionData) => item.id === intersection.id,
      ) !== -1);
}
