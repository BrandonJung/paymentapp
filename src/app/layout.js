'use client';

import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import 'primereact/resources/themes/soho-dark/theme.css';
import 'primeicons/primeicons.css';
import { _apiCall } from './utils/helpers/functions';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Adb, Menu } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    // <PrimeReactProvider>
    //   <html lang='en'>
    //     <body
    //       style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         overflow: 'hidden',
    //       }}>

    //       <div
    //         style={{
    //           maxWidth: 1550,
    //           width: '100%',
    //         }}>
    //         {children}
    //       </div>
    //     </body>
    //   </html>
    // </PrimeReactProvider>
    <html lang='en' className={roboto.variable}>
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
