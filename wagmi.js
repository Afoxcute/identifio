import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { bscTestnet, avalancheFuji } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { metaMask } from "wagmi/connectors";
export const config = createConfig({
  chains: [avalancheFuji, bscTestnet],
  // chains: [base],
  connectors: [coinbaseWallet(), metaMask()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    // [base.id]: http(),
    [avalancheFuji.id]: http(),
    [bscTestnet.id]: http(),
  },
});


