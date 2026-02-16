import { PROJECTS } from './data';

import type { Activity } from './types';

export function getActivityById(id: string): Activity | undefined {
  return PROJECTS.find((p) => p.id === id);
}
