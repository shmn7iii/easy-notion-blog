import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import DocumentHead from '../../components/document-head'
import {
  BlogTagLink,
  NoContents,
  PostDate,
  PostTags,
  PostTitle,
  PostsNotFound,
  SidebarLogo,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'

import { getBeforeLink } from '../../lib/blog-helpers'
import {
  getPosts,
  getRankedPosts,
  getPostsBefore,
  getFirstPost,
  getAllTags,
} from '../../lib/notion/client'

export async function getStaticProps({ params: { date } }) {
  if (!Date.parse(date) || !/\d{4}-\d{2}-\d{2}/.test(date)) {
    return { notFound: true }
  }

  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPostsBefore(date),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ])

  return {
    props: {
      date,
      posts,
      firstPost,
      rankedPosts,
      tags,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  const path = getBeforeLink(posts[posts.length - 1].Date)

  return {
    paths: [path],
    fallback: 'blocking',
  }
}

const RenderPostsBeforeDate = ({ date, posts = [], tags = [], redirect }) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && !posts) {
      router.replace(redirect)
    }
  }, [router, redirect, posts])

  if (!posts) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead description={`Post before ${date}`} />

      <div className={styles.mainContent}>
        <header>
          <h2>Posts before {date}</h2>
        </header>

        <NoContents contents={posts} />

        <div className={styles.subContent}>
          <SidebarLogo />
          <BlogTagLink tags={tags} />
        </div>

        {posts.map(post => {
          return (
            <div className={styles.postIndex} key={post.Slug}>
              <div className={styles.postLeft}>
                <PostTitle post={post} />
              </div>
              <div className={styles.postRight}>
                <PostTags post={post} />
                <PostDate post={post} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RenderPostsBeforeDate
