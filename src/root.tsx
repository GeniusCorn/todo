import 'virtual:uno.css'

import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start'

// @refresh reload
import { Suspense } from 'solid-js'

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Solid Starter</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="m-0 p-0">
        <Suspense>
          <ErrorBoundary>
            {/* <A href="/">Index</A>
            <A href="/about">About</A> */}
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
