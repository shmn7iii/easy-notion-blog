import { redirect } from 'next/navigation'
import GoogleAnalytics from '../../../components/google-analytics'
import {
  BlogTagLink,
  NoContents,
  PostBody,
  PostDate,
  PostTags,
  PostTitle,
} from '../../../components/blog-parts'
import styles from '../../../styles/blog.module.css'
import {
  getAllPosts,
  getPostBySlug,
  getAllTags,
  getAllBlocksByBlockId,
} from '../../../lib/notion/client'

export const revalidate = 30

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.Slug }))
}

const BlogSlugPage = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    redirect('/blog')
  }

  const [
    blocks,
    tags,
  ] = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
    getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle={post.Title} />
      <div className={styles.content}>
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
    </>
  )
}

export default BlogSlugPage
