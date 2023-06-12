import * as React from 'react';
import BasicCard from '../Card';
import { useSignTypedData, useAccount } from 'wagmi';
import { getValueByContract, jsonParse, jsonString } from '../../utils/index';
const msgParams = {
  types: {
    Mail: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'contents', type: 'string' },
    ],
  },
  domain: {
    name: 'SignTypeData_V3',
    version: '1',
    chainId: 5,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  primaryType: 'fillWithPermit',
  message: {
    cc: {
      from: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      to: '0xCcCcccCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    },
    from: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    to: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    contents: 'Hello, Bob!',
  },
};

function SignTypeData() {
  const { address } = useAccount();
  const [message, setMessage] = React.useState(jsonString(msgParams.message));
  const [type, setType] = React.useState('Mail');
  const [types, setTypes] = React.useState<any>(jsonString(msgParams.types));
  const [domain, setDomain] = React.useState<any>(jsonString(msgParams.domain));
  const { signTypedData, ...data } = useSignTypedData({
    primaryType: type,
    types: jsonParse(types),
    domain: jsonParse(domain),
    message: jsonParse(message),
  });
  const buttons = [
    {
      name: 'SignTypeData_v3',
      disabled: !address,
      onClick: () => signTypedData(),
    },
    {
      name: 'data reset',
      disabled: !address,
      onClick: () => {
        setMessage(jsonString(msgParams.message));
        setDomain(jsonString(msgParams.domain));
        setTypes(jsonString(msgParams.types));
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
            title: 'SignTypeData_v3',
          },
          {
            type: 'textArea',
            title: 'Domain',
            label: 'Domain',
            rows: 8,
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
