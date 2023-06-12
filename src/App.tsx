import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal, Web3Button } from '@web3modal/react';
import PersonalSign from './components/Ethereum/PersonalSign';
import EthSign from './components/Ethereum/Contract';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Approve from './components/Ethereum/Approve';
import { WagmiConfig, createConfig } from 'wagmi';
import { configureChains } from '@wagmi/core';
import { arbitrum, goerli, mainnet, polygon } from '@wagmi/core/chains';
import SignTypeDataV3 from './components/Ethereum/SignTypeData_v3';
import SignTypeDataV4 from './components/Ethereum/SignTypeData_v4';
import Permit from './components/Ethereum/Permit';
import SeaPort from './components/Ethereum/SeaPort';

function isInMobile() {
  const userAgent = navigator.userAgent;
  const mobileKeywords = [
    'Android',
    'iPhone',
    'iPod',
    'iPad',
    'Windows Phone',
    'BlackBerry',
  ];
  for (const mobileKeyword of mobileKeywords) {
    if (userAgent.includes(mobileKeyword)) {
      return true;
    }
  }
  return false;
}
const chains = [mainnet, arbitrum, goerli, polygon];
const projectId = process.env.projectId as string;
// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
function HomePage() {
  const isMobile = isInMobile();

  const pcXs = isMobile ? 12 : 4;
  const pcXls = isMobile ? 12 : 6;
  return (
    <Box
      sx={{
        width: '95%',
        margin: 'auto',
        marginTop: '20px',
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} display="flex" justifyContent="flex-end">
          <Web3Button />
        </Grid>
        <Grid xs={pcXs}>
          <EthSign />
        </Grid>
        <Grid xs={pcXs}>
          <PersonalSign />
        </Grid>
        <Grid xs={pcXs}>
          <Approve />
        </Grid>
        <Grid xs={pcXls}>
          <SignTypeDataV3 />
        </Grid>
        <Grid xs={pcXls}>
          <SignTypeDataV4 />
        </Grid>
        <Grid xs={pcXls}>
          <Permit />
        </Grid>
        <Grid xs={pcXls}>
          <SeaPort />
        </Grid>
      </Grid>
    </Box>
  );
}
function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
export default App;
