import {
  PostBody
} from '../../components/blog-parts'
import {
  getAllPosts,
  getPostBySlug,
  getAllBlocksByBlockId,
} from '../../lib/notion/client'
import styles from '../../styles/portfolio.module.css'

export const revalidate = 30

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.Slug }))
}

const WorksPage = async () => {
  const post = await getPostBySlug('_works')
  const blocks = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
  ])

  return (
    <>
      <div>
        <div className={styles.post}>
          <h3> Works </h3>
          <PostBody blocks={blocks} />
        </div>
      </div>
    </>
  )
}

export default WorksPage
