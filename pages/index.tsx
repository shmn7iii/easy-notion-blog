import Image from 'next/image'
import useSWR from "swr"
import axios from 'axios'

import DocumentHead from '../components/document-head'
import { Block } from '../lib/notion/interfaces'
import {
  PostBody,
} from '../components/blog-parts'
import styles from '../styles/portfolio.module.css'
import {
  getPostBySlug,
  getAllBlocksByBlockId,
} from '../lib/notion/client'

export async function getStaticProps() {
  const slug = "_index"
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/',
      },
      revalidate: 30,
    }
  }

  const blocks = await getAllBlocksByBlockId(post.PageId)

  const fallback = {}
  fallback[slug] = blocks

  return {
    props: {
      slug,
      post,
      blocks,
      fallback,
    },
    revalidate: 60,
  }
}

const fetchBlocks = async (slug: string): Promise<Array<Block>> => {
  try {
    const { data: blocks } = await axios.get(`/api/blocks?slug=${slug}`)
    return blocks as Array<Block>
  } catch (error) {
    console.log(error)
  }
}

const includeExpiredImage = (blocks: Array<Block>): boolean => {
  const now = Date.now()

  return blocks.some(block => {
    if (block.Type === 'image') {
      const image = block.Image
      if (image.File && image.File.ExpiryTime && Date.parse(image.File.ExpiryTime) < now) {
        return true
      }
    }
    // TODO: looking for the image block in Children recursively
    return false
  })
}

const RenderPost = ({
  slug,
  fallback,
}) => {
  const { data: blocks } = useSWR(includeExpiredImage(fallback[slug]) && slug, fetchBlocks, { fallbackData: fallback[slug] })

  return (
    <div>
      <DocumentHead title="Home"/>
      <div className={styles.icon}>
        <Image src="/icon.png" width={128} height={128} alt="icon" />
      </div>

      <div className={styles.post}>
        <PostBody blocks={blocks} />
      </div>
    </div>
  )
}

export default RenderPost
