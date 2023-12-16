'use client'

import MarkdownRenderer from "@/components/MarkdownRenderer"
import { useAppContext } from "@/context/state"
import { Article } from "@/types/shared"
import { Box, HStack, Text,Avatar,Heading, Image, Stack, Flex } from "@chakra-ui/react"
import { format } from "date-fns"
import Head from "next/head"
import { useState } from "react"

import {useParams} from 'next/navigation'

import { v4 as uuidv4 } from "uuid"
 const ArticleView =()=>{
        const articles:Article[]=[ {
            id: uuidv4(),
            slug: "fitness-recipes-healthy-food-for-any-workout",
            title: "Fitness Recipes: Healthy Food for Any Workout",
            content: `
                When it comes to staying fit, exercise is only part of the equation. Proper nutrition plays a crucial role in supporting your fitness goals. In this article, we'll explore a collection of delicious and nutritious fitness recipes that cater to different dietary preferences.
        
                ## High-Protein Smoothie Bowl
        
                Start your day right with a high-protein smoothie bowl. Blend together your favorite fruits, a scoop of protein powder, and a dollop of Greek yogurt. Top it with granola, nuts, and seeds for an energy-packed breakfast that will keep you fueled throughout your workout.
        
                ## Grilled Chicken Salad
        
                For a satisfying and protein-rich lunch, try a grilled chicken salad. Load up on colorful veggies, toss in some quinoa, and drizzle with a light vinaigrette. This refreshing salad is not only delicious but also provides essential nutrients for muscle recovery.
        
                ...
        
                Enjoy these fitness recipes as part of your balanced diet, and elevate your fitness journey to new heights.
            `,
            createdAt: new Date(),
            author: {
                name: "Lucky victory"
            }
        }, {
            id: uuidv4(),
            slug: "this-may-be-the-untold-secret-to-longevity",
            title: "This May Be the Untold Secret to Longevity",
            content: `
                Unlocking the secrets to a longer and healthier life has been a pursuit throughout human history. While there's no magic potion for immortality, recent studies have uncovered some intriguing factors that may contribute to longevity.
        
                ## Mindful Eating
        
                Practicing mindful eating, savoring each bite and paying attention to hunger and fullness cues, has been linked to improved overall health. This simple yet powerful habit can lead to better digestion and a more balanced relationship with food.
        
                ## Regular Physical Activity
        
                Engaging in regular physical activity is a well-established key to longevity. It not only strengthens the body but also supports mental well-being. Find an activity you enjoy, whether it's walking, swimming, or dancing, and make it a part of your routine.
        
                ...
        
                Embracing these practices may not grant immortality, but they can certainly contribute to a longer and more fulfilling life.
            `,
            createdAt: new Date(),
            author: {
                name: "Lucky victory"
            }
        },{
            id: uuidv4(),
            slug: "walking-leads-to-longer-life-better-outcomes",
            title: "Walking Leads to Longer Life, Better Outcomes",
            content: `
                In a world where high-intensity workouts often take the spotlight, there's a simple and accessible exercise that deserves more attention: walking. Research suggests that incorporating regular walks into your routine can lead to a longer life and improved overall health.
        
                ## Cardiovascular Benefits
        
                Walking is an excellent cardiovascular exercise that gets your heart pumping and improves circulation. This, in turn, lowers the risk of heart disease and other cardiovascular issues. A brisk walk is a natural way to boost cardiovascular health.
        
                ## Mental Well-Being
        
                Beyond the physical benefits, walking also contributes to mental well-being. It reduces stress, anxiety, and depression, providing a natural mood boost. Whether you prefer a solo stroll or a group walk, the mental health benefits are significant.
        
                ...
        
                Lace up your walking shoes, embrace this simple yet powerful exercise, and pave the way for a longer and healthier life.
            `,
            createdAt: new Date(),
            author: {
                name: "Lucky victory"
            }
        }]
        const params=useParams()
        const articleFromSlug=articles.find((arti)=>arti?.slug===params['slug'])
    const [article,setArticle]=useState<Article>(articleFromSlug ||{} as Article )
return(

    <>
    <Head>
        <title>{article?.title}</title>
    </Head>
    <Box bg={'secondaryColor.100'}>
<Box bg={'white'} maxW={'1000px'} mx={'auto'} minH={'100vh'} px={{lg:6,base:4}} py={6}>

<HStack my={4}  spacing={'4'} mb={8}>
    <Avatar size={'sm'} src={article?.author?.avatar} />
    <HStack divider={<DotDivider/>}>

     <Text as={'strong'} fontSize={'large'}>{article?.author?.name}</Text> <Text as={'time'} fontWeight={'medium'} fontSize={'sm'} color={'gray.500'} >{format(article?.createdAt,'MMM dd, yyyy')}</Text>
    </HStack>
</HStack>
<Stack spacing={4} mb={6}>

<Box>
    <Heading mb={8} >{article?.title}</Heading >
    {article?.intro && <Text color={'gray.500'} fontWeight={'medium'} mb={2}>{article?.intro}</Text>}
</Box>

<Box >

<Image w={'full'} bg={'gray.100'} alt="" src={article?.image||'/images/placeholder-image.png'} h={'auto'} maxH={{lg:500,base:400}} objectFit={'contain'}/>
</Box>
</Stack>

<Box>
   <MarkdownRenderer markdown={article?.content} />
</Box>
</Box>
    </Box>
    
    </>
)

}

export const DotDivider=()=>{
    return(
        <Flex align={'center'} justify={'center'} px={2}>
            <Box w={1} h={1} rounded={'full'} bg={'gray.300'}>

            </Box>
        </Flex>
    )
}

export default ArticleView