import React from 'react';

type CodingExpDescriptionProps = {
  description: string;
};

/**
 * 코딩 경험 설명 렌더링 컴포넌트
 * - description을 줄 단위로 나눠 표시
 * - 첫 줄이 "..." 형태일 경우 해당 문장을 강조 표시
 */
const CodingExpDescription: React.FC<CodingExpDescriptionProps> = ({ description }) => {
  if (!description) return null;

  const lines = description.split('\n');
  const firstLine = lines[0];
  const rest = lines.slice(1);

  const quotedMatch = firstLine.match(/^"(.+)"$/);

  return (
    <div className="mt-2 space-y-1 text-sm text-gray-600">
      {quotedMatch ? (
        <p className="font-semibold text-gray-800">"{quotedMatch[1]}"</p>
      ) : (
        <p>{firstLine}</p>
      )}

      {rest.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
};

export default CodingExpDescription;