import { Fragment, useEffect, useState } from 'react';
import BasicCard from '../Card';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from 'wagmi';
import { ContractProps } from './index';
import {
  getValueByContract,
  formatApproveValueToUnits,
  formatUnitsToApproveValue,
} from '../../utils/index';
import { erc20abi } from '../../abi';
import { mainnetContract, ContractAddress } from '../../constant';
import { BigNumber } from 'ethers';

function SendTransaction({
  contract,
  isContract,
  symbol,
  decimal,
}: ContractProps) {
  const { address: accountAddress } = useAccount();
  const [amount, setAmount] = useState(1);
  const selectSpendAddress = [
    ...mainnetContract,
    {
      value: accountAddress,
      name: 'test EOA Address',
    },
  ];
  const selectApproveMethods = [
    {
      value: 'approve',
      name: 'approve',
    },
    {
      value: 'decreaseAllowance',
      name: 'decreaseAllowance',
    },
    {
      value: 'increaseAllowance',
      name: 'increaseAllowance',
    },
  ];
  const [spenderAddress, setSpenderAddress] = useState(
    mainnetContract[1].value,
  );
  const [approveMethods, setApproveMethods] = useState(
    selectApproveMethods[0].value,
  );
  const [customAddress, setCustomAddress] = useState('');
  const allowanceData = useContractRead({
    address: contract,
    abi: erc20abi,
    functionName: 'allowance',
    // args: [contract, address as ContractAddress],
    args: [accountAddress, spenderAddress],
  });
  useEffect(() => {
    if (allowanceData.data) {
      setAmount(
        Number(
          formatApproveValueToUnits(allowanceData.data as BigNumber, decimal),
        ),
      );
    }
  }, [allowanceData.data]);
  const { config } = usePrepareContractWrite({
    address: contract,
    abi: erc20abi,
    functionName: approveMethods as unknown as any,
    args: [
      spenderAddress as ContractAddress,
      formatUnitsToApproveValue(amount, decimal),
    ],
  });
  const { data, status, write } = useContractWrite(config);
  const buttons = [
    {
      name: 'SendTransaction',
      disabled: !isContract || !accountAddress,
      onClick: async () => {
        try {
          write?.();
        } catch (error) {
          console.log('>>>>>>>>err', error);
        }
      },
    },
  ];
  return (
    <Fragment>
      <BasicCard
        buttons={buttons}
        list={[
          { type: 'title', title: 'SendTransaction' },
          {
            type: 'select',
            label: 'Select Spender Address',
            value: spenderAddress,
            setValue: setSpenderAddress,
            list: selectSpendAddress,
          },
          {
            type: spenderAddress ? '' : 'input',
            label: 'Custom Spender Address',
            value: customAddress,
            setValue: setCustomAddress,
          },
          {
            type: 'select',
            label: 'Select Approve Methods',
            value: approveMethods,
            setValue: setApproveMethods,
            list: selectApproveMethods,
          },
          {
            type: 'input',
            label: 'Amount',
            value: amount,
            setValue: setAmount,
          },
          {
            type: 'content',
            title: 'Spender Address',
            content: spenderAddress ?? customAddress,
          },
          {
            type: 'content',
            title: 'Allowance',
            content: accountAddress
              ? getValueByContract({
                  ...allowanceData,
                  data: formatApproveValueToUnits(
                    allowanceData.data as BigNumber,
                    decimal,
                    symbol,
                  ),
                })
              : 'idle',
          },
          {
            type: 'content',
            title: 'Result',
            content: getValueByContract({
              data,
              status,
            }),
          },
        ]}
      />
    </Fragment>
  );
}

export default SendTransaction;
