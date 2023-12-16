import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi';
import { ethers } from 'ethers';
import { useAppContext } from '@/context/state';

import { communityAbi } from '../../abis'
import { communityAddr } from '@/utils/constants';


const useRegisterUser = (cid: any, debouncedAmount: any, fulfillRegistration: any) => {
  const { address } = useAccount();
  const { allTokensData } = useAppContext();

  const { config } = usePrepareContractWrite({
    //@ts-ignore
    address: communityAddr,
    abi: communityAbi,
    functionName: 'registerUser',
    args: [cid, allTokensData.userNftUri],
    //@ts-ignore
    value: ethers.utils.parseEther(debouncedAmount || '0'),
  });

  const {
    write: registerUser,
    data,
    isLoading: isTxLoading,
  } = useContractWrite(config);

  const { isLoading: isWaitingRegTx } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(tx) {
      console.log(tx);
      fulfillRegistration();
    },
  });

  return {isTxLoading, isWaitingRegTx, registerUser}

}

export default useRegisterUser;