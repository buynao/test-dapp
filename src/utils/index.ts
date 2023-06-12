import { BigNumber, utils } from 'ethers';
const maxUint256 =
  '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

export const getValueByContract = ({ data, status }: any) => {
  const resultByStatus = {
    error: 'access failed',
    loading: 'loading...',
    idle: 'idle...',
    success: data?.toString(),
  };
  return resultByStatus[status];
};

export const formatApproveValueToUnits = (
  value?: BigNumber | undefined,
  decimal?: number,
  symbol?: string,
) => {
  if (!value || !decimal) return '~';

  if (value?.eq(0)) {
    return '0';
  }
  if (value?.eq(BigNumber.from(maxUint256))) {
    return 'Infinite';
  }
  const amount = utils.formatUnits(value, decimal);
  return symbol ? `${amount} ${symbol}` : amount;
};

export const formatUnitsToApproveValue = (
  value: string | number,
  decimal?: number,
) => {
  if (!value || !decimal) return 0;

  return utils.parseUnits(value.toString(), BigInt(decimal));
};

export const getInfinite = () => {
  return BigNumber.from(maxUint256);
};
export const isInfinite = (value: string | number) => {
  if (!value) return false;
  if (BigNumber.from(value)?.eq(BigNumber.from(maxUint256))) {
    return true;
  }
};
export const jsonParse = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};
export const jsonString = (data: object, key = null, value = 2) => {
  try {
    return JSON.stringify(data, key, value);
  } catch (error) {
    return '';
  }
};
