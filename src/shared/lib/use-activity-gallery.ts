import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

type UseActivityGalleryParams = {
  /** 활동 내역 식별자 (라우트 변경 시 갤러리 인덱스 초기화에 사용) */
  activityId: string;

  /** 목록/상세 대표 이미지 */
  coverImage: string;

  /** 상세 갤러리 이미지들 (대표 이미지 제외) */
  galleryImages?: string[];

  /** 스와이프 인식 최소 이동(px) */
  swipeThresholdPx?: number;
};

type UseActivityGalleryResult = {
  /** 대표 + 갤러리 이미지를 합친 최종 이미지 배열 (0번이 대표) */
  images: string[];

  /** 현재 선택된 이미지 인덱스 */
  currentIndex: number;

  /** 현재 선택된 이미지 src */
  currentSrc: string;

  /** 이미지가 2장 이상인지 여부 */
  hasMultipleImages: boolean;

  /** 인덱스를 직접 설정 (자동 clamp) */
  setIndex: (nextIndex: number) => void;

  /** 이전/다음으로 이동 */
  goPrev: () => void;
  goNext: () => void;

  /** 모바일 스와이프용 포인터 이벤트 핸들러 */
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
};

export function useActivityGallery({
  activityId,
  coverImage,
  galleryImages,
  swipeThresholdPx = 50,
}: UseActivityGalleryParams): UseActivityGalleryResult {
  // 갤러리 이미지만 사용, 비어있으면 대표 이미지 fallback
  const images = useMemo(() => {
    const gallery = (galleryImages ?? []).filter(Boolean);

    // 갤러리 이미지가 있으면 그것만 사용
    if (gallery.length > 0) return gallery;

    // 갤러리가 비어있을 때만 대표 이미지 fallback
    return coverImage ? [coverImage] : [''];
  }, [coverImage, galleryImages]);

  const total = images.length;

  // state에 activityId와 index를 같이 저장하여 effect 없이 초기화하기 위함
  const [state, setState] = useState<{ activityId: string; index: number }>(() => ({
    activityId,
    index: 0,
  }));

  const clampIndex = useCallback(
    (n: number) => Math.min(Math.max(n, 0), Math.max(0, total - 1)),
    [total],
  );

  // activityId가 변경되면 index를 0으로 초기화
  const effectiveIndexRaw = state.activityId === activityId ? state.index : 0;
  const currentIndex = clampIndex(effectiveIndexRaw);

  const setIndex = useCallback(
    (nextIndex: number) => {
      setState({ activityId, index: clampIndex(nextIndex) });
    },
    [clampIndex, activityId],
  );

  const goPrev = useCallback(() => {
    setState(({ activityId: stateActivityId, index }) => {
      const baseIndex = stateActivityId === activityId ? index : 0;
      const nextIndex = Math.max(baseIndex - 1, 0);
      return { activityId, index: nextIndex };
    });
  }, [activityId]);

  const goNext = useCallback(() => {
    setState(({ activityId: stateActivityId, index }) => {
      const baseIndex = stateActivityId === activityId ? index : 0;
      const nextIndex = Math.min(baseIndex + 1, Math.max(0, total - 1));
      return { activityId, index: nextIndex };
    });
  }, [activityId, total]);

  const currentSrc = images[currentIndex] ?? images[0] ?? '';

  const hasMultipleImages = total > 1;

  // 스와이프(포인터) 처리
  const startXRef = useRef<number | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // 주 포인터(첫 터치/클릭)만 처리
    if ('isPrimary' in e && !e.isPrimary) return;
    startXRef.current = e.clientX;
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const startX = startXRef.current;
      startXRef.current = null;
      if (startX == null) return;

      const delta = e.clientX - startX;

      // 이미지가 1장뿐이면 이동할 필요 없음
      if (!hasMultipleImages) return;

      if (Math.abs(delta) < swipeThresholdPx) return;

      // 왼쪽으로 드래그(음수) => 다음, 오른쪽으로 드래그(양수) => 이전
      if (delta < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev, hasMultipleImages, swipeThresholdPx],
  );

  const onPointerCancel = useCallback((e: React.PointerEvent) => {
    // 브라우저/OS 제스처 등으로 포인터가 취소되면 드래그 상태만 정리
    startXRef.current = null;

    // pointer capture를 사용했다면 안전하게 해제(지원하는 환경만)
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  return {
    images,
    currentIndex,
    currentSrc,
    hasMultipleImages,
    setIndex,
    goPrev,
    goNext,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  };
}
