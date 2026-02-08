import React from 'react';

type ErrorTextProps = {
  show?: boolean;
  message?: string;
};

/**
 * 공용 에러 메시지 컴포넌트
 * - show가 true이고 message가 존재할 때만 렌더링
 * - 폼 전반에서 동일한 스타일로 에러를 표시하기 위함
 */
export const ErrorText: React.FC<ErrorTextProps> = ({ show, message }) => {
  if (!show || !message) return null;

  return <p className="mt-2 text-xs font-semibold text-red-500">{message}</p>;
};

export default ErrorText;
