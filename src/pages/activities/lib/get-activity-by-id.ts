import { ACTIVITIES } from './data';

import type { Activity } from './types';

export function getActivityById(id: string): Activity | undefined {
  return ACTIVITIES.find((p) => p.id === id);
}
