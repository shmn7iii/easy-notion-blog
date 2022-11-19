import DocumentHead from '../components/document-head'
import {
  PostBody,
} from '../components/blog-parts'
import styles from '../styles/portfolio.module.css'
import {
  getPostBySlug,
  getAllBlocksByBlockId,
} from '../lib/notion/client'

export async function getStaticProps() {
  const post = await getPostBySlug("_index")
  const blocks = await getAllBlocksByBlockId(post.PageId)

  return {
    props: {
      blocks,
    },
    revalidate: 60,
  }
}

const RenderPost = ({ blocks = [] }) => {
  return (
    <div className={styles.content}>
      <DocumentHead title="Home"/>

      <div className={styles.post}>
        <PostBody blocks={blocks} />
      </div>
    </div>
  )
}

export default RenderPost
