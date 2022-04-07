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
import { getTagLink } from '../../lib/blog-helpers'
import { useEffect } from 'react'
import { getPostsByTag, getAllTags } from '../../lib/notion/client'

export async function getStaticProps({ params: { tag } }) {
  const posts = await getPostsByTag(tag)

  if (posts.length === 0) {
    console.log(`Failed to find posts for tag: ${tag}`)
    return {
      props: {
        redirect: '/',
      },
      revalidate: 30,
    }
  }

  const [tags] = await Promise.all([getAllTags()])

  return {
    props: {
      posts,
      tags,
      tag,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const tags = await getAllTags()

  return {
    paths: tags.map(tag => getTagLink(tag)),
    fallback: 'blocking',
  }
}

const RenderPostsByTags = ({ tag, posts = [], tags = [], redirect }) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && posts.length === 0) {
      router.replace(redirect)
    }
  }, [router, redirect, posts])

  if (!posts) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead description={`Posts in ${tag}`} />
      <div className={styles.subContent}>
        <SidebarLogo />
        <BlogTagLink tags={tags} />
      </div>

      <div className={styles.mainContent}>
        <header>
          <h2>{tag}</h2>
        </header>

        <NoContents contents={posts} />

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

export default RenderPostsByTags
