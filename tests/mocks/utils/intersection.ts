import { intersections } from '../data/intersection';

export const getIntersections = () => [...intersections];

export const getIntersection = () => (getIntersections()[0]);
