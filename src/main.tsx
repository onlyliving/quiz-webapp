import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { Root } from "./router";
import "./styles/global.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
            <RecoilRoot>
                <Root />
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>
)
