export type InputValue = {
  value: `0x${string}`;
  name: string;
};
export type ContractAddress = `0x${string}`;
export const mainnetContract: InputValue[] = [
  {
    value: '0x101816545F6bd2b1076434B54383a1E633390A2E',
    name: 'S*SGETH',
  },
  {
    value: '0x0000000000095413afc295d19edeb1ad7b71c952',
    name: 'Lon',
  },
  {
    value: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    name: 'SushiSwap',
  },
  {
    value: '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7',
    name: 'Curvefi',
  },
  {
    value: '0x24946bCbBd028D5ABb62ad9B635EB1b1a67AF668',
    name: 'Gearbox: PoolService',
  },
  {
    value: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
    name: 'Stargate: LPStaking',
  },
  {
    value: '0x283751A21eafBFcD52297820D27C1f1963D9b5b4',
    name: 'Starknet: StarknetERC20Bridge',
  },
];
export const goerliContract: InputValue[] = [
  {
    value: '0x6dA0e6ABd44175f50C563cd8b860DD988A7C3433',
    name: 'Lon',
  },
  {
    value: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    name: 'Uni',
  },
  {
    value: '0x004c13f6f5ef19cd6d0244bd268b6c84f5fe2228',
    name: 'TST',
  },
];
export const opContract: InputValue[] = [
  {
    value: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    name: 'DAI',
  },
  {
    value: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
    name: 'Stargate Finance',
  },
];
export const getContractsById = (id: number) => {
  const localContractList = window.localStorage.getItem('contract');
  console.log('>>>>', localContractList);
  const list = localContractList ? JSON.parse(localContractList) : ({} as any);
  if (id === 1) {
    return list[id] || mainnetContract;
  }
  if (id === 5) {
    return list[id] || goerliContract;
  }
  return list?.[id] || mainnetContract;
};
