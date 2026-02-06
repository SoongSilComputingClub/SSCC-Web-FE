import { PROJECTS } from './data';

import type { Project } from './types';

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
