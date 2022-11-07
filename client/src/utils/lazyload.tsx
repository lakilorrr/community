import { Loading } from '@/components/Loading';
import React, { LazyExoticComponent, Suspense } from 'react';

export const lazyLoad = (LazyComponent: LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};
