import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_URL } from '../lib/notion/server-constants'
import DocumentHead from '../components/document-head'
import {
  BlogTagLink,
  NoContents,
  PostBody,
  PostDate,
  PostTags,
  PostTitle,
  PostsNotFound,
  SidebarLogo,
} from '../components/blog-parts'
import SocialButtons from '../components/social-buttons'
import styles from '../styles/blog.module.css'
import { getBlogLink } from '../lib/blog-helpers'
import {
  getAllPosts,
  getPostBySlug,
  getAllTags,
  getAllBlocksByBlockId,
} from '../lib/notion/client'

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

  return {
    props: {
      post,
      blocks,
      tags,
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

const RenderPost = ({ post, blocks = [], tags = [], redirect }) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [router, redirect, post])

  if (!post) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead
        title={post.Title}
        description={post.Excerpt}
        urlOgImage={post.OGImage}
      />

      <div className={styles.subContent}>
        <SidebarLogo />
        <p className={styles.blogTagLinkTitle}>
          ⚑ Tags
        </p>
        <BlogTagLink tags={tags} />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.post}>
          <PostTitle post={post} enableLink={false} />
          <div className={styles.postTagDate}>
            <PostTags post={post} />
            <PostDate post={post} />
          </div>

          <NoContents contents={blocks} />
          <PostBody blocks={blocks} />

          <footer>
            {NEXT_PUBLIC_URL && (
              <SocialButtons
                title={post.Title}
                url={new URL(
                  getBlogLink(post.Slug),
                  NEXT_PUBLIC_URL
                ).toString()}
                id={post.Slug}
              />
            )}
          </footer>
        </div>
      </div>
    </div>
  )
}

export default RenderPost
