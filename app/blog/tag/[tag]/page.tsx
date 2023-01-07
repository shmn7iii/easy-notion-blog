import { notFound } from 'next/navigation'
import GoogleAnalytics from '../../../../components/google-analytics'
import {
  BlogTagLink,
  NoContents,
  PostDate,
  PostTags,
  PostTitle,
} from '../../../../components/blog-parts'
import styles from '../../../../styles/blog.module.css'
import {
  getPostsByTag,
  getAllTags,
} from '../../../../lib/notion/client'

export const revalidate = 60

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(tag => ({ tag: tag }))
}

const BlogTagPage = async ({ params: { tag: encodedTag } }) => {
  const tag = decodeURIComponent(encodedTag)

  const posts = await getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  const [tags] = await Promise.all([
    getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle={`Posts in ${tag}`} />
      <div className={styles.content}>
        <div className={styles.mainContent}>

          <div className={styles.posts}>
            <h2 className={styles.posts}>
            {tag}
            </h2>

            <NoContents contents={posts} />

            {posts.map(post => {
            return (
              <div className={styles.postIndex} key={post.Slug}>
                <div className={styles.postIndexLeft}>
                  <PostTitle post={post} />
                </div>
                <div className={styles.postIndexRight}>
                  <PostTags post={post} />
                  <PostDate post={post} />
                </div>
              </div>
            )
          })}
          </div>
        </div>

        <div className={styles.subContent}>
          <BlogTagLink tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogTagPage
