import * as React from 'react';
import BasicCard from '../Card';
import { useSignTypedData, useAccount } from 'wagmi';
import { getValueByContract, jsonParse, jsonString } from '../../utils/index';
// All properties on a domain are optional
const domainObj = {
  name: 'SignTypeData_V4',
  version: '1',
  chainId: 5,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const;

// The named list of all type definitions
const typesObj = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
  Group: [
    { name: 'name', type: 'string' },
    { name: 'wallets', type: 'address[]' },
  ],
  Mail: [
    { name: 'from', type: 'Group' },
    { name: 'to', type: 'Person[]' },
    { name: 'contents', type: 'string' },
  ],
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallets', type: 'PersonItem[]' },
  ],
  PersonItem: [{ name: 'account', type: 'PersonItem1' }],
  PersonItem1: [{ name: 'address', type: 'address' }],
};
const messageObj = {
  contents: 'Hello, Bob!',
  from: {
    name: 'Cow',
    wallets: [
      '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
    ],
  },
  to: [
    {
      name: 'Bob',
      wallets: [
        {
          account: {
            address: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          },
        },
        {
          account: {
            address: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbee1',
          },
        },
      ],
    },
  ],
};

function SignTypeData() {
  const { address } = useAccount();
  const [type, setType] = React.useState('Mail');
  const [message, setMessage] = React.useState(jsonString(messageObj));
  const [types, setTypes] = React.useState<any>(jsonString(typesObj));
  const [domain, setDomain] = React.useState<any>(jsonString(domainObj));
  const { signTypedData, ...data } = useSignTypedData({
    primaryType: type,
    domain: jsonParse(domain),
    types: jsonParse(types),
    message: jsonParse(message),
  });
  const buttons = [
    {
      name: 'SignTypeData_V4',
      disabled: !address,
      onClick: () => signTypedData(),
    },
    {
      name: 'data reset',
      disabled: !address,
      onClick: () => {
        setMessage(jsonString(messageObj));
        setDomain(jsonString(domainObj));
        setTypes(jsonString(typesObj));
        setType('Mail');
      },
    },
  ];
  return (
    <React.Fragment>
      <BasicCard
        buttons={buttons}
        list={[
          {
            type: 'title',
            title: 'SignTypeData_V4',
          },
          {
            type: 'textArea',
            title: 'Domain',
            label: 'Domain',
            rows: 6,
            value: domain,
            setValue: setDomain,
          },
          {
            type: 'input',
            label: 'primaryType',
            value: type,
            setValue: setType,
          },
          {
            type: 'textArea',
            title: 'Types',
            label: 'Types',
            value: types,
            setValue: setTypes,
          },
          {
            type: 'textArea',
            title: 'Message',
            label: 'Message',
            value: message,
            setValue: setMessage,
          },
          {
            type: 'content',
            title: 'Result',
            content: getValueByContract(data),
          },
        ]}
      />
    </React.Fragment>
  );
}

export default SignTypeData;
