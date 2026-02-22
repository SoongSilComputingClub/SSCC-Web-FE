// src/pages/activities/detail/index.tsx
import { useParams } from 'react-router-dom';

import { ActivityDetail } from '../components/activity-detail';
import { getActivityById } from '../lib/get-activity-by-id';

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  const activity = getActivityById(id);

  if (!activity) {
    return <div>존재하지 않는 프로젝트입니다.</div>;
  }

  return <ActivityDetail activity={activity} />;
}
