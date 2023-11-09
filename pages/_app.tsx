import { NetworkId } from '@/config';
import '@/styles/globals.css';
import { useInitWallet } from '@/wallets/wallet-selector';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  useInitWallet({ createAccessKeyFor: '', networkId: NetworkId });

  return <Component {...pageProps} />;
}
