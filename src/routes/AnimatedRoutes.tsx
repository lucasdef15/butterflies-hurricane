import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressLoader from '../progressLoaders/ProgressLoader';

// Pages
const LazyInitialLoginPage = lazy(() => import('../pages/InitialLoginPage'));

export default function AnimatedRoutes() {
  return (
    <AnimatePresence>
      <Suspense fallback={<ProgressLoader />}>
        <Routes>
          <Route
            path='/'
            element={
              <Suspense fallback={<ProgressLoader />}>
                <LazyInitialLoginPage />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
