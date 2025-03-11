import { ethers } from 'ethers';
import { Fragment, useEffect, useState } from 'react';
import BasicCard from '../Card';
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useSendTransaction,
} from 'wagmi';
import {
  getValueByContract,
  formatApproveValueToUnits,
  formatUnitsToApproveValue,
  isInfinite,
  getInfinite,
} from '../../utils/index';
import { erc20abi } from '../../abi';
import { getContractsById, ContractAddress, InputValue } from '../../constant';
import { BigNumber } from 'ethers';

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
  {
    value: 'increaseApproval',
    name: 'increaseApproval',
  },
  {
    value: 'decreaseApproval',
    name: 'decreaseApproval',
  },
];
const erc20 = new ethers.utils.Interface([
  'function approve(address spender, uint256 amount) external payable',
  'function decreaseAllowance(address spender, uint256 subtractedValue) external payable',
  'function increaseAllowance(address spender, uint256 addedValue) external payable',
  'function increaseApproval(address spender, uint256 addedValue) external payable',
  'function decreaseApproval(address spender, uint256 subtractedValue) external payable',
]);

function Approve() {
  const { chain } = useNetwork();
  const [customContract, setCustomContract] = useState('');
  const [contractListByNetWork, setContractLis] = useState(
    // @ts-ignore
    getContractsById(chain?.id),
  );
  const { address: accountAddress } = useAccount();
  const [amount, setAmount] = useState(1);
  const selectContractAddress = [...contractListByNetWork];
  const selectSpendAddress = [
    ...contractListByNetWork,
    {
      value: accountAddress,
      name: 'test EOA Address',
    },
  ];
  const [contractAddress, setContractAddress] = useState(
    contractListByNetWork[0]?.value,
  );
  const [actionState, setActionState] = useState('EIP1559');
  const { data: symbol } = useContractRead({
    address: contractAddress,
    abi: erc20abi,
    functionName: 'symbol',
  });
  const { data: decimalData } = useContractRead({
    address: contractAddress,
    abi: erc20abi,
    functionName: 'decimals',
  });
  const decimal = BigNumber.from(decimalData || 0).toNumber();
  const [spenderAddress, setSpenderAddress] = useState(
    contractListByNetWork[1]?.value,
  );
  const [approveMethods, setApproveMethods] = useState(
    selectApproveMethods[0]?.value,
  );
  const [customAddress, setCustomAddress] = useState(accountAddress);
  const allowanceData = useContractRead({
    address: contractAddress,
    abi: erc20abi,
    functionName: 'allowance',
    // args: [contract, address as ContractAddress],
    args: [accountAddress, spenderAddress || customAddress],
  });
  useEffect(() => {
    if (contractListByNetWork[1]?.value) {
      setSpenderAddress(contractListByNetWork[1]?.value);
    }
  }, [contractListByNetWork[1]?.value]);
  const genData = () => {
    try {
      return erc20.encodeFunctionData(approveMethods, [
        spenderAddress || customAddress,
        isInfinite(amount)
          ? amount
          : formatUnitsToApproveValue(amount, decimal),
      ]) as any;
    } catch (error) {}
    return '0x';
  };
  const {
    data: transactionData,
    status: transactionStatus,
    sendTransaction,
  } = useSendTransaction({
    data: genData(),
    from: accountAddress,
    to: spenderAddress || customAddress,
    gasLimit: '0x5028',
    maxFeePerGas: BigInt('0x2540be400'),
    maxPriorityFeePerGas: BigInt('0x3b9aca00'),
  } as any);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: erc20abi,
    functionName: approveMethods as unknown as any,
    args: [
      spenderAddress || (customAddress as ContractAddress),
      isInfinite(amount)
        ? amount
        : formatUnitsToApproveValue(amount, decimal).toString(),
    ],
  });
  const { write, status, data } = useContractWrite(config);

  const { config: nameConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: customContract,
    abi: erc20abi,
    functionName: 'name',
  });
  const { write: writeName } = useContractWrite(config);
  const buttons = [
    {
      name: 'Approve(Legacy)',
      disabled: !accountAddress,
      onClick: async () => {
        try {
          setActionState('Legacy');
          write?.();
        } catch (error) {}
      },
    },
    {
      name: 'Approve(EIP1559)',
      disabled: !accountAddress,
      onClick: async () => {
        try {
          setActionState('EIP1559');
          sendTransaction?.();
        } catch (error) {}
      },
    },
    ,
    {
      name: 'set infinite',
      onClick: async () => {
        try {
          setAmount(getInfinite() as unknown as number);
        } catch (error) {}
      },
    },
  ];
  useEffect(() => {
    if (!nameConfig.result) {
      return;
    }
    const contractList = [
      ...contractListByNetWork,
      {
        name: nameConfig.result,
        value: customContract,
      } as InputValue,
    ];
    setContractLis(contractList);
    const currentContact = {
      [chain?.id || 'xx']: contractList,
    };
    localStorage.setItem('contract', JSON.stringify(currentContact));
  }, [nameConfig.result]);
  useEffect(() => {
    const currentContact = {
      [chain?.id || 'xx']: contractListByNetWork,
    };
    localStorage.setItem('contract', JSON.stringify(currentContact));
  }, []);
  return (
    <Fragment>
      <BasicCard // @ts-ignore
        buttons={buttons}
        list={[
          { type: 'title', title: 'Approve' },
          {
            type: 'inputBtn',
            label: 'Add Contract Address',
            value: customContract,
            setValue: (val) => {
              setCustomContract(val);
            },
            saveValue: () => {
              if (customContract.length > 10) {
                writeName?.();
              }
            },
          },
          {
            type: 'select',
            label: 'Select Contract Address',
            value: contractAddress,
            setValue: (val) => {
              setContractAddress(val);
            },
            list: selectContractAddress,
          },
          {
            type: 'select',
            label: 'Select Spender Address',
            value: spenderAddress,
            setValue: (val) => {
              setSpenderAddress(val);
            },
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
            content: spenderAddress || customAddress,
          },
          {
            type: 'content',
            title: 'Allowance',
            content: accountAddress
              ? formatApproveValueToUnits(
                  BigNumber.from(allowanceData?.data || 0) as BigNumber,
                  decimal,
                  symbol as unknown as string,
                )
              : 'idle',
          },
          {
            type: 'content',
            title: 'Result',
            content: getValueByContract({
              data: actionState === 'Legacy' ? data : transactionData,
              status: actionState === 'Legacy' ? status : transactionStatus,
            }),
          },
        ]}
      />
    </Fragment>
  );
}

export default Approve;
