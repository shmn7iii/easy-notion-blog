import DocumentHead from '../components/document-head'
import {
  PostDate,
  PostTags,
  PostIndexTitle,
  BlogTagLink,
  SidebarLogo,
} from '../components/blog-parts'
import styles from '../styles/blog.module.css'
import {
  getPosts,
  getAllTags,
  getRankedPosts
 } from '../lib/notion/client'

export async function getStaticProps() {
  const [posts, rankedPosts, tags] = await Promise.all([
    getPosts(),
    getRankedPosts(),
    getAllTags()
  ])

  return {
    props: {
      posts,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPosts = ({ posts = [], rankedPosts = [], tags = [] }) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Home" />

      <div className={styles.subContent}>
        <SidebarLogo />
        <BlogTagLink tags={tags} />
      </div>

      <div className={styles.mainContent}>

        <div className={styles.posts}>
          <h2 className={styles.posts}>Recommended Posts</h2>
          {rankedPosts.map(post => {
            return (
              <div className={styles.postIndex} key={post.Slug}>
                <div className={styles.postIndexLeft}>
                  <PostIndexTitle post={post} />
                </div>
                <div className={styles.postIndexRight}>
                  <PostTags post={post} />
                  <PostDate post={post} />
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.posts}>
          <h2 className={styles.posts}>All Posts</h2>
          {posts.map(post => {
            return (
              <div className={styles.postIndex} key={post.Slug}>
                <div className={styles.postIndexLeft}>
                  <PostIndexTitle post={post} />
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
    </div>
  )
}

export default RenderPosts
