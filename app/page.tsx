import Image from 'next/image'
import GoogleAnalytics from '../components/google-analytics'
import {
  PostBody
} from '../components/blog-parts'
import styles from '../styles/portfolio.module.css'
import {
  getAllPosts,
  getPostBySlug,
  getAllBlocksByBlockId,
} from '../lib/notion/client'

export const revalidate = 30

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.Slug }))
}

const RootPage = async () => {
  const post = await getPostBySlug('_index')

  const [
    blocks,
  ] = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle={post.Title} />
      <div>
        <div className={styles.icon}>
          <Image src="/icon.png" width={128} height={128} alt="icon" />
        </div>

        <div className={styles.post}>
          <PostBody blocks={blocks} />
        </div>
      </div>
    </>
  )
}

export default RootPage
