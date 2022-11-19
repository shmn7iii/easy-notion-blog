import DocumentHead from '../../components/document-head'
import {
  NoContents,
  PostDate,
  PostTags,
  PostIndexTitle,
  BlogTagLink,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getAllTags,
  getRankedPosts
 } from '../../lib/notion/client'

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
  posts = posts.filter(post => post.Slug.match(/^(?!_).*$/));

  return (
    <div className={styles.content}>
      <DocumentHead
        title="Blog"
        description="Blog of shmn7iii"
      />

      <div className={styles.mainContent}>

        <div className={styles.posts}>
          <h2 className={styles.posts}>
            Recommended Posts
          </h2>

          <NoContents contents={posts} />

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
          <h2 className={styles.posts}>
            All Posts
          </h2>

          <NoContents contents={posts} />

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

      <div className={styles.subContent}>
        <BlogTagLink tags={tags} />
      </div>
    </div>
  )
}

export default RenderPosts
