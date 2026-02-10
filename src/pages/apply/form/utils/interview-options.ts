import { RECRUITMENT_SCHEDULE } from '@/shared/config/recruitment';

export type InterviewOption = {
  id: string;
  label: string;
  slots: string[];
};

const pad2 = (n: number) => String(n).padStart(2, '0');

const formatYmd = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const formatKoreanLabel = (d: Date) => {
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  const weekday = new Intl.DateTimeFormat('ko-KR', {
    weekday: 'long',
  }).format(d);

  return `${m}월 ${day}일 ${weekday}`;
};

const buildHourlySlots = (startHour: number, endHour: number) => {
  const slots: string[] = [];

  for (let h = startHour; h < endHour; h += 1) {
    slots.push(`${pad2(h)}:00 - ${pad2(h + 1)}:00`);
  }

  return slots;
};

export const buildInterviewOptionsFromRecruitment = (): InterviewOption[] => {
  const interview = RECRUITMENT_SCHEDULE.find((it) => it.title === '면접');

  const startIso = interview?.range?.startIso;
  const endIso = interview?.range?.endIso;

  if (!startIso || !endIso) return [];

  const start = new Date(startIso);
  const end = new Date(endIso);

  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);

  const last = new Date(end);
  last.setHours(0, 0, 0, 0);

  const options: InterviewOption[] = [];

  while (cur.getTime() <= last.getTime()) {
    const isFirst = formatYmd(cur) === formatYmd(start);
    const isLast = formatYmd(cur) === formatYmd(end);

    const startHour = isFirst ? Math.max(10, start.getHours()) : 10;
    const endHour = isLast ? Math.min(20, end.getHours()) : 20;

    options.push({
      id: formatYmd(cur),
      label: formatKoreanLabel(cur),
      slots: startHour < endHour ? buildHourlySlots(startHour, endHour) : [],
    });

    cur.setDate(cur.getDate() + 1);
  }

  return options;
};

export const INTERVIEW_OPTIONS: InterviewOption[] = buildInterviewOptionsFromRecruitment();
