import React from 'react'
import useSWR from "swr"
import axios from 'axios'

import DocumentHead from '../../components/document-head'
import { Block } from '../../lib/notion/interfaces'
import {
  BlogTagLink,
  NoContents,
  PostBody,
  PostDate,
  PostTags,
  PostTitle,
  PostsNotFound,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import { getBlogLink } from '../../lib/blog-helpers'
import {
  getAllPosts,
  getPostBySlug,
  getAllTags,
  getAllBlocksByBlockId,
} from '../../lib/notion/client'

export async function getStaticProps({ params: { slug } }) {
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

  const [blocks, tags] = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
    getAllTags(),
  ])

  const fallback = {}
  fallback[slug] = blocks

  return {
    props: {
      slug,
      post,
      blocks,
      tags,
      fallback,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map(post => getBlogLink(post.Slug)),
    fallback: 'blocking',
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

  blocks.forEach(block => {
    if (block.Type === 'image') {
      const image = block.Image
      if (image.File && image.File.ExpiryTime && Date.parse(image.File.ExpiryTime) < now) {
        return true
      }
    }
    // TODO: looking for the image block in Children recursively
  })

  return false
}

const RenderPost = ({
  slug,
  post,
  tags = [],
  fallback,
}) => {
  const { data: blocks, error } = useSWR(includeExpiredImage(fallback[slug]) && slug, fetchBlocks, { fallbackData: fallback[slug] })

  if (error || !blocks) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.content}>
      <DocumentHead
        title={post.Title}
        description={post.Excerpt}
        urlOgImage={post.OGImage}
      />

      <div className={styles.mainContent}>
        <div className={styles.post}>
          <PostTitle post={post} enableLink={false} />
          <div className={styles.postTagDate}>
            <PostTags post={post} />
            <PostDate post={post} />
          </div>

          <NoContents contents={blocks} />
          <PostBody blocks={blocks} />
        </div>
      </div>

      <div className={styles.subContent}>
        <BlogTagLink tags={tags} />
      </div>
    </div>
  )
}

export default RenderPost
