import React from 'react'
import Link from 'next/link'

import NotionBlock from './notion-block'
import * as interfaces from '../lib/notion/interfaces'
import { getBlogLink, getDateStr, getTagLink } from '../lib/blog-helpers'
import styles from '../styles/blog-parts.module.css'
import Image from 'next/image'

export const SidebarLogo = () => (
  <div style={{ marginBottom: '20px' }}>
    <Link href="/" passHref>
      <a>
        <Image src="/logo.png" width={174} height={53} alt="logo" />
      </a>
    </Link>
  </div>
)

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <h3 className={styles.postTitle}>
      {enableLink ? (
        <Link href="/[slug]" as={getBlogLink(post.Slug)} passHref>
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
        <Link href="/[slug]" as={getBlogLink(post.Slug)} passHref>
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
        <Link href="/tag/[tag]" as={getTagLink(tag)} key={tag} passHref>
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
  <div className={styles.blogTagLink}>
    <NoContents contents={tags} />
    <TagLinkList tags={tags} />
  </div>
)

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <ul>
      {tags.map(tag => {
        return (
          <div key={tag}>
            <Link href="/tag/[tag]" as={getTagLink(tag)} passHref>
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
