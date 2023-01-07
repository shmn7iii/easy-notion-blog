import { redirect } from 'next/navigation'
import Image from 'next/image'
import {
  PostBody
} from '../components/blog-parts'
import {
  getAllPosts,
  getPostBySlug,
  getAllBlocksByBlockId,
} from '../lib/notion/client'
import styles from '../styles/portfolio.module.css'

export const revalidate = 30

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.Slug }))
}

const RootPage = async () => {
  const post = await getPostBySlug('_index')

  console.log(post)
  if (!post) {
    console.log(`Failed to find post for slug: _index`)
    redirect('/blog')
  }

  const [
    blocks,
  ] = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
  ])

  return (
    <>
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
