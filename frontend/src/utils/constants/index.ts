import { Chain } from "@wagmi/core";
export const appName = 'REJUVENATE_AI';
export const communityAddr = "0x3a65168B746766066288B83417329a7F901b5569"

export const pego = {
    id: 20201022,
    name: "PEGO Mainnet",
    network: "pego",
    nativeCurrency: {
      decimals: 18,
      name: "PEGO",
      symbol: "PG",
    },
    rpcUrls: {
      public: { http: ["https://pegorpc.com"] },
      default: { http: ["https://pegorpc.com"] },
    },
    blockExplorers: {
      etherscan: { name: "expolorer", url: "https://scan.pego.network/" },
      default: { name: "expolorer", url: "https://scan.pego.network/" },
    },
  
  } as const satisfies Chain;