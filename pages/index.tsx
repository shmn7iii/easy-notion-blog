import Image from 'next/image'

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
  const blocks = await getAllBlocksByBlockId(post?.PageId)

  return {
    props: {
      blocks,
    },
    revalidate: 60,
  }
}

const RenderPost = ({ blocks = [] }) => {
  return (
    <div>
      <DocumentHead title="Home"/>
      <div className={styles.icon}>
        <Image src="/icon.png" width={128} height={128} alt="icon" />
      </div>

      <div className={styles.post}>
        <PostBody blocks={blocks} />
      </div>
    </div>
  )
}

export default RenderPost
