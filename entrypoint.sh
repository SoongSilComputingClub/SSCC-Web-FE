#!/bin/sh

find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.html' \) -exec sh -c '
  escape_for_sed() {
    echo "$1" | sed -e "s/[&\\/|]/\\\\&/g"
  }

  for file do
    # VITE_BACKEND_API_BASE_URL 치환
    if [ -n "$VITE_BACKEND_API_BASE_URL" ]; then
      SAFE_URL=$(escape_for_sed "$VITE_BACKEND_API_BASE_URL")
      sed -i "s|__VITE_BACKEND_API_BASE_URL__|$SAFE_URL|g" "$file"
    fi
    
    # VITE_APPLICATION_OPEN_AT_ISO 치환
    if [ -n "$VITE_APPLICATION_OPEN_AT_ISO" ]; then
      SAFE_OPEN_AT=$(escape_for_sed "$VITE_APPLICATION_OPEN_AT_ISO")
      sed -i "s|__VITE_APPLICATION_OPEN_AT_ISO__|$SAFE_OPEN_AT|g" "$file"
    fi
    
    # VITE_APPLICATION_CLOSE_AT_ISO 치환
    if [ -n "$VITE_APPLICATION_CLOSE_AT_ISO" ]; then
      SAFE_CLOSE_AT=$(escape_for_sed "$VITE_APPLICATION_CLOSE_AT_ISO")
      sed -i "s|__VITE_APPLICATION_CLOSE_AT_ISO__|$SAFE_CLOSE_AT|g" "$file"
    fi
  done
' sh {} +