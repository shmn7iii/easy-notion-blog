import { ROOT_POST_PAGE_ID} from '../app/server-constants'
import Image from 'next/image'
import {
  PostBody
} from '../components/blog-parts'
import {
  getAllPosts,
  getAllBlocksByBlockId,
} from '../lib/notion/client'
import styles from '../styles/portfolio.module.css'

export const revalidate = 30

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.Slug }))
}

const RootPage = async () => {

  const blocks = await Promise.all([
    getAllBlocksByBlockId(ROOT_POST_PAGE_ID),
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
