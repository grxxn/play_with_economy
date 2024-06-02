"use client";

import { Suspense } from 'react';
import WriteSuspense from './SuspenseWrapper';

/**
 * 게시글 작성 화면
 * 
 * @author yjjeon
 * @returns 
 */
export default function Write() {

  return (
    <Suspense>
      <WriteSuspense />
    </Suspense>
  )
}