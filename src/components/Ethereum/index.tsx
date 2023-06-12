export type ContractProps = {
  isContract?: boolean;
  contract: `0x${string}`;
  name?: string;
  decimal?: number;
  symbol?: string;
  status?: 'error' | 'idle' | 'loading' | 'success';
  setContract?: React.Dispatch<React.SetStateAction<`0x${string}`>>;
};
