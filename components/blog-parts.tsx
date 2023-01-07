import React from 'react'
import Link from 'next/link'

import { Post } from '../lib/notion/interfaces'
import NotionBlocks from './notion-block'
import {
  getBeforeLink,
  getBlogLink,
  getDateStr,
  getTagLink,
  getTagBeforeLink,
} from '../lib/blog-helpers'
import styles from '../styles/blog-parts.module.css'


export const Logo = ({ subTitle = null }) => (
  <div className={styles.logo}>
    <div className={styles.logoShape}>
      <Link href="/" passHref>
        <div>
          <p>shmn7iii</p>
        </div>
      </Link>
    </div>
    <div className={styles.logoSubTitle}>
      {subTitle ? (
        <Link href={ "/" + subTitle} passHref>
          <p>{subTitle.charAt(0).toUpperCase() + subTitle.slice(1).toLowerCase()}</p>
        </Link>
      ) : (
        null
      )}
    </div>
  </div>
)

export const HeaderLinks = () => (
  <div className={styles.headerLinks}>
    <Link href="/" passHref>
      Home
    </Link>
    <Link href="/blog" passHref>
      Blog
    </Link>
    <Link href="https://twitter.com/shmn7iii" passHref>
      <svg width="20px" height="20px" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
    </Link>
    <Link href="https://github.com/shmn7iii" passHref>
      <svg width="20px" height="20px" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    </Link>
    <Link href="https://www.wantedly.com/id/shmn7iii" passHref>
      <svg width="20px" height="20px" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Wantedly</title><path d="M18.453 14.555c-.171-.111-.658-.764-2.006-3.982a9.192 9.192 0 0 0-.237-.526l-.274-.664-2.362-5.702H8.85l2.362 5.702 2.362 5.706 2.181 5.267a.196.196 0 0 0 .362 0l2.373-5.682a.1.1 0 0 0-.037-.119zm-8.85 0c-.171-.111-.658-.764-2.006-3.982a8.971 8.971 0 0 0-.236-.525l-.276-.665-2.36-5.702H0l2.362 5.702 2.362 5.706 2.181 5.267a.196.196 0 0 0 .362 0l2.374-5.682a.098.098 0 0 0-.038-.119ZM24 6.375a2.851 2.851 0 0 1-2.851 2.852 2.851 2.851 0 0 1-2.852-2.852 2.851 2.851 0 0 1 2.852-2.851A2.851 2.851 0 0 1 24 6.375Z"/></svg>
    </Link>
  </div>
)

export const PostDate = ({ post }) => (
  <div className={styles.postDate}>
    {post.Date ? getDateStr(post.Date) : ''}
  </div>
)

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <h3 className={styles.postTitle}>
      {enableLink ? (
        <Link href={getBlogLink(post.Slug)}>
          {postTitle}
        </Link>
      ) : (
        postTitle
      )}
    </h3>
  )
}

export const PostIndexTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <p className={styles.postIndexTitle}>
      {enableLink ? (
        <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
          {postTitle}
        </Link>
      ) : (
        postTitle
      )}
    </p>
  )
}

export const PostTags = ({ post }) => (
  <div className={styles.postTags}>
    {post.Tags &&
      post.Tags.length > 0 &&
      post.Tags.map((tag: string) => (
        <Link href={getTagLink(tag)} key={tag}>
          {tag}
        </Link>
      ))}
  </div>
)

export const PostExcerpt = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Excerpt ? post.Excerpt : ''}</p>
  </div>
)

export const PostBody = ({ blocks }) => (
  <div className={styles.postBody}>
    <NotionBlocks blocks={blocks} />
  </div>
)

export const ReadMoreLink = ({ post }) => (
  <div className={styles.readMoreLink}>
    <Link href={getBlogLink(post.Slug)} className={styles.readMore}>
      Read more
    </Link>
  </div>
)

export const NextPageLink = ({ firstPost, posts, tag = '' }) => {
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date === lastPost.Date) return null

  return (
    <div className={styles.nextPageLink}>
      <Link
        href={
          tag
            ? getTagBeforeLink(tag, lastPost.Date)
            : getBeforeLink(lastPost.Date)
        }
      >
        Next page ＞
      </Link>
    </div>
  )
}

export const NoContents = ({ contents }) => {
  if (!!contents && contents.length > 0) return null

  return <div className={styles.noContents}>There are no contents yet</div>
}

export const BlogPostLink = ({ heading, posts }) => (
  <div className={styles.blogPostLink}>
    <h3>{heading}</h3>
    <NoContents contents={posts} />
    <PostLinkList posts={posts} />
  </div>
)

export const BlogTagLink = ({ tags }) => (
  <div>
    <div className={styles.blogTagLinkTitle}>
      <p>⚑ Tags</p>
    </div>
    <div className={styles.blogTagLink}>
      <NoContents contents={tags} />
      <TagLinkList tags={tags} />
    </div>
  </div>
)

export const PostLinkList = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <ul>
      {posts.map((post: Post) => {
        return (
          <li key={post.Slug}>
            <Link href={getBlogLink(post.Slug)}>
              {post.Title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <ul>
      {tags.map((tag: string) => {
        return (
          <li key={tag}>
            <Link href={getTagLink(tag)}>
              {tag}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const PostsNotFound = () => (
  <div className={styles.postsNotFound}>
    Woops! did not find the posts, redirecting you back to the blog index
  </div>
)
