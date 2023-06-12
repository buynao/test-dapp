import * as React from 'react';
import BasicCard from '../Card';
import { useSignTypedData, useAccount } from 'wagmi';
import { getValueByContract, jsonParse, jsonString } from '../../utils/index';

const msgParams = {
  types: {
    fillWithPermit: [
      {
        name: 'makerAddr',
        type: 'address',
      },
      {
        name: 'takerAssetAddr',
        type: 'address',
      },
      {
        name: 'makerAssetAddr',
        type: 'address',
      },
      {
        name: 'takerAssetAmount',
        type: 'uint256',
      },
      {
        name: 'makerAssetAmount',
        type: 'uint256',
      },
      {
        name: 'takerAddr',
        type: 'address',
      },
      {
        name: 'receiverAddr',
        type: 'address',
      },
      {
        name: 'salt',
        type: 'uint256',
      },
      {
        name: 'deadline',
        type: 'uint256',
      },
      {
        name: 'feeFactor',
        type: 'uint256',
      },
    ],
    EIP712Domain: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'version',
        type: 'string',
      },
      {
        name: 'chainId',
        type: 'uint256',
      },
      {
        name: 'verifyingContract',
        type: 'address',
      },
    ],
  },
  domain: {
    name: 'Tokenlon',
    version: 'v5',
    chainId: 1,
    verifyingContract: '0xfd6c2d2499b1331101726a8ac68ccc9da3fab54f',
  },
  primaryType: 'fillWithPermit',
  message: {
    makerAddr: '0xb3c839dbde6b96d37c56ee4f9dad3390d49310aa',
    takerAssetAddr: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    makerAssetAddr: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    takerAssetAmount: '100000000000000000',
    makerAssetAmount: '183732593',
    takerAddr: '0xe9a147eadb46df9b149fd01a1a2a296263fae7ee',
    receiverAddr: '0xe9a147eadb46df9b149fd01a1a2a296263fae7ee',
    salt: '36978479068754082757718878504756259654831435536920092840575895342327841554462',
    deadline: '1686283226',
    feeFactor: '30',
  },
};

function SignTypeData() {
  const { address } = useAccount();
  const [message, setMessage] = React.useState(jsonString(msgParams.message));
  const [domain, setDomain] = React.useState(jsonString(msgParams.domain));
  const [types, setTypes] = React.useState(jsonString(msgParams.types));
  const [type, setType] = React.useState('fillWithPermit');
  const { signTypedData, ...data } = useSignTypedData({
    domain: jsonParse(domain),
    primaryType: type,
    types: jsonParse(types),
    message: jsonParse(message),
  });
  const buttons = [
    {
      name: 'permit',
      disabled: !address,
      onClick: () => {
        signTypedData();
      },
    },
    {
      name: 'data reset',
      disabled: !address,
      onClick: () => {
        setMessage(jsonString(msgParams.message));
        setDomain(jsonString(msgParams.domain));
        setTypes(jsonString(msgParams.types));
        setType('fillWithPermit');
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
            title: 'TokenLon - Permit',
          },
          {
            type: 'textArea',
            title: 'Domain',
            label: 'Domain',
            value: domain,
            rows: 8,
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
