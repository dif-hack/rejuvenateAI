import { shortenText } from "@/helpers"
import { Article as ArticleCard } from "@/types/shared"
import { Box, Heading, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import NextLink from 'next/link'

const ArticleCard = ({article}:{article:ArticleCard|Partial<ArticleCard>}) => {
  return (
<LinkBox  _hover={{bg:'white',shadow:'md'}}  display={'flex'} flexDir={'column'} gap={'2'} maxW={'350px'}  rounded={'md'} p={'2'} pb={4}>
    <Image alt="" src={'/images/fruit.jpg'} objectFit={'cover'} rounded={'inherit'} placeholder="blur" w={'full'} h={200} />
    <LinkOverlay href={'/blog/article/'+article?.slug} as={NextLink}>
        <Heading as={'h3'} size={'md'} color={'primaryColor.800'}> {article?.title}</Heading>
    </LinkOverlay>
    <Text>
    {article?.intro ? article?.intro : shortenText(article?.content as string,200)}
    </Text>
</LinkBox>
  )
}

export default ArticleCard