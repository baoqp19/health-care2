import { ConfigProvider, App as AntApp } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeRoutes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GOOGLE_OAUTH_CLIENT_ID } from "./config/env";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

import "./i18n"

const queryClient = new QueryClient();


function App() {
  const router = createBrowserRouter(ThemeRoutes);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          borderRadius: 4,
          controlHeight: 37,
        },

      }}
    >
      {/* <GoogleOAuthProvider  clientId={GOOGLE_OAUTH_CLIENT_ID}> */}
      <QueryClientProvider client={queryClient}>
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </QueryClientProvider>
      {/* </GoogleOAuthProvider  > */}
    </ConfigProvider>
  );
}

export default App;
