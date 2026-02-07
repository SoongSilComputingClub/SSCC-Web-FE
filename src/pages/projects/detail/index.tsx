// src/pages/projects/detail/index.tsx
import { useParams } from 'react-router-dom';

import { ProjectDetail } from '../components/project-detail';
import { getProjectById } from '../lib/get-project-by-id';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  const project = getProjectById(id);

  if (!project) {
    return <div>존재하지 않는 프로젝트입니다.</div>;
  }

  return <ProjectDetail project={project} />;
}
