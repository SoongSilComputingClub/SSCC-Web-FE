#!/bin/sh

echo "Injecting runtime environment variables..."

# dist 폴더 안의 모든 js, html 파일에서 임시 문자열을 찾아 쿨리파이 환경변수로 치환
find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.html' \) -exec sh -c '
  for file do
    # VITE_BACKEND_API_BASE_URL 치환
    if [ -n "$VITE_BACKEND_API_BASE_URL" ]; then
      sed -i "s|__VITE_BACKEND_API_BASE_URL__|$VITE_BACKEND_API_BASE_URL|g" "$file"
    fi
    
    # APPLICATION_OPEN_AT_ISO 치환 (프론트엔드 코드에서는 import.meta.env.VITE_APPLICATION_OPEN_AT_ISO 로 사용)
    if [ -n "$VITE_APPLICATION_OPEN_AT_ISO" ]; then
      sed -i "s|__VITE_APPLICATION_OPEN_AT_ISO__|$VITE_APPLICATION_OPEN_AT_ISO|g" "$file"
    fi
    
    # APPLICATION_CLOSE_AT_ISO 치환
    if [ -n "$VITE_APPLICATION_CLOSE_AT_ISO" ]; then
      sed -i "s|__VITE_APPLICATION_CLOSE_AT_ISO__|$VITE_APPLICATION_CLOSE_AT_ISO|g" "$file"
    fi
  done
' sh {} +

echo "Environment variables injected successfully. Starting Nginx..."

# CMD로 전달된 Nginx 실행 명령어 수행
exec "$@"