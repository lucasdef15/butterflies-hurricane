import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressLoader from '../components/progressLoaders/ProgressLoader';

// Pages
const LazyInitialLoginPage = lazy(() => import('../pages/InitialLoginPage'));
const LazyPostsPage = lazy(() => import('../pages/PostsPage'));

// Layouts

const LazyRootLayout = lazy(() => import('../layouts/RootLayout'));

export default function AnimatedRoutes() {
  return (
    <AnimatePresence>
      <Suspense fallback={<ProgressLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path='/'
            element={
              <Suspense fallback={<ProgressLoader />}>
                <LazyInitialLoginPage />
              </Suspense>
            }
          />
          <Route path='/posts' element={<LazyRootLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<ProgressLoader />}>
                  <LazyPostsPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
