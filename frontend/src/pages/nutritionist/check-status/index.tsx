'use client'
import { communityAddr } from '@/utils/constants'
import { Box, Button, Flex, Heading, Input, Stack, StackDivider, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React, { KeyboardEvent, useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { communityAbi } from '../../../../abis'
import { useDebounce } from '@/hooks/useDebounce'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import {ethers} from 'ethers'

const NutritionistStatusPage = () => {
    const router=useRouter()
    const { user, setUser, allTokensData } = useAppContext();
    const [amount, setAmount] = useState('0.01');
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [addressValue,setAddressValue]=useState('');
    const debouncedAmount = useDebounce<string>(amount, 500);

  const [cid, setCid] = useState<string>('');

  const { config } =  usePrepareContractWrite({
    //@ts-ignore
    address: communityAddr,
    abi: communityAbi,
    functionName: 'checkIsApproved',
    args: [addressValue],
    //@ts-ignore
    value: ethers.utils.parseEther(debouncedAmount || '0'),
  });

  const { write: checkIsApproved, data } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(tx) {
        
      console.log(tx);
    //   router.push('/member/dashboard');
    },
  });

const handleInputKeyup=(evt:KeyboardEvent)=>{
if(evt.key==='Enter'){
    handleSubmit()
}
}
    const handleSubmit=async ()=>{
setIsSubmitting(true);
try {
   checkIsApproved?.()
    setIsSubmitting(false);
} catch (error) {
    setIsSubmitting(false);  
}

    }
  return (
    <>
    <Head>
        <title>Nutrionist | Check Application Status</title>
    </Head>
    <Flex className='h-screen' bg={'secondaryColor.50'} align={'center'}>
<Stack shadow={'md'} rounded={'md'}  spacing={6} bg={'white'} mx={'auto'} py={{lg:8,base:6}} px={{base:3,lg:6}}>
    <Stack >

    <Heading textAlign={'center'} size={'lg'}>Application status</Heading>
<Text color={'gray.600'} fontSize={'14px'} textAlign={'center'}>Enter your address to check your application status</Text>
    </Stack>
<Stack spacing={6}>

    <Input value={addressValue} onChange={(e)=>setAddressValue(e.target.value)} onKeyUp={handleInputKeyup} placeholder='0xb48c794fd8d9.....'/>
    <Button isDisabled={!addressValue|| isSubmitting} isLoading={isSubmitting||isLoading} onClick={()=>handleSubmit()}>Continue</Button>
</Stack>
</Stack>
    </Flex>
    </>
  )
}

export default NutritionistStatusPage