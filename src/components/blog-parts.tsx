import React from 'react'
import Link from 'next/link'

import NotionBlock from './notion-block'
import * as interfaces from '../lib/notion/interfaces'
import { getBlogLink, getDateStr, getTagLink } from '../lib/blog-helpers'
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
      <a><svg width="20px" height="20px" role="img" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><title>Home</title><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></a>
    </Link>
    <Link href="/blog" passHref>
      <a><svg width="20px" height="20px" role="img" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><title>Blog</title><path d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM128 416c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg></a>
    </Link>
    <Link href="https://twitter.com/shmn7iii" passHref>
      <a target="_blank"><svg width="20px" height="20px" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
    </Link>
    <Link href="https://github.com/shmn7iii" passHref>
      <a target="_blank"><svg width="20px" height="20px" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </Link>
  </div>
)

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <h3 className={styles.postTitle}>
      {enableLink ? (
        <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
          <a>{postTitle}</a>
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
          <a>{postTitle}</a>
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
      post.Tags.map(tag => (
        <Link href="/blog/tag/[tag]" as={getTagLink(tag)} key={tag} passHref>
          <a>{tag}</a>
        </Link>
      ))}
  </div>
)

export const PostDate = ({ post }) => (
  <div className={styles.postDate}>
    {post.Date ? getDateStr(post.Date) : ''}
  </div>
)

export const PostBody = ({ blocks }) => (
  <div className={styles.postBody}>
    {wrapListItems(blocks).map((block, i) => (
      <NotionBlock block={block} key={`post-body-${i}`} />
    ))}
  </div>
)

export const NoContents = ({ contents }) => {
  if (!!contents && contents.length > 0) return null

  return <div className={styles.noContents}>There are no contents yet</div>
}

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

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <ul>
      {tags.map(tag => {
        return (
          <div key={tag}>
            <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
              <a>{tag}</a>
            </Link>
          </div>
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

const wrapListItems = blocks =>
  blocks.reduce((arr, block, i) => {
    const isBulletedListItem = block.Type === 'bulleted_list_item'
    const isNumberedListItem = block.Type === 'numbered_list_item'

    if (!isBulletedListItem && !isNumberedListItem) return arr.concat(block)

    const listType = isBulletedListItem ? 'bulleted_list' : 'numbered_list'

    if (i === 0) {
      const list: interfaces.List = {
        Type: listType,
        ListItems: [block],
      }
      return arr.concat(list)
    }

    const prevList = arr[arr.length - 1]

    if (
      (isBulletedListItem && prevList.Type !== 'bulleted_list') ||
      (isNumberedListItem && prevList.Type !== 'numbered_list')
    ) {
      const list: interfaces.List = {
        Type: listType,
        ListItems: [block],
      }
      return arr.concat(list)
    }

    prevList.ListItems.push(block)

    return arr
  }, [])
