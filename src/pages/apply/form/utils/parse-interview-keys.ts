export type InterviewTime = { date: string; startTime: string; endTime: string };

/**
 * UI에서 선택한 인터뷰 시간 키(selectedInterviewKeys)를 서버 payload(interviewTimes)로 변환합니다.
 *
 * 지원하는 키 포맷:
 * - "YYYY-MM-DD|HH:mm|HH:mm" (권장)
 * - 기타 문자열(레거시): 정규식으로 날짜/시간 3개를 추출 시도
 */
export function parseInterviewKeys(keys: string[]): InterviewTime[] {
  return keys
    .map((key) => {
      if (key.includes('|')) {
        const [date, startTime, endTime] = key.split('|');
        if (!date || !startTime || !endTime) return null;
        return { date, startTime, endTime };
      }

      const regex = /(\d{4}-\d{2}-\d{2}).*?(\d{2}:\d{2}).*?(\d{2}:\d{2})/;
      const m = regex.exec(key);
      if (!m) return null;
      return { date: m[1], startTime: m[2], endTime: m[3] };
    })
    .filter((v): v is InterviewTime => v !== null);
}
