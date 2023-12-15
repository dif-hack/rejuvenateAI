import { Chain } from "@wagmi/core";

export const appName = 'REJUVENATE_AI';
export const communityAddr = "0x61b230EB8f636BE7F96134F0922b765B8e86c60D"

export const xrpEvm = {
    id: 1440002,
    name: "XRPL EVM Sidechain",
    network: "xrpEVM",
    nativeCurrency: {
      decimals: 18,
      name: "Xrp",
      symbol: "XRP",
    },
    rpcUrls: {
      public: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
      default: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
    },
    blockExplorers: {
      etherscan: { name: "expolorer", url: "https://evm-sidechain.xrpl.org" },
      default: { name: "expolorer", url: "https://evm-sidechain.xrpl.org" },
    },
  
  } as const satisfies Chain;