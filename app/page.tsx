// import { ROOT_POST_PAGE_ID} from '../app/server-constants'
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
  const slug = 'ion-did-create'
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
  }

  const blocks = await Promise.all([
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
