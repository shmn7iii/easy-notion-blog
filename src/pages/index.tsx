import DocumentHead from '../components/document-head'
import {
  NoContents,
  PostDate,
  PostTags,
  PostTitle,
  BlogTagLink,
  SidebarLogo,
} from '../components/blog-parts'
import styles from '../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../lib/notion/client'

export async function getStaticProps() {
  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPosts(),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ])

  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPosts = ({ posts = [], tags = [] }) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Home" />

      <div className={styles.subContent}>
        <SidebarLogo />
        <BlogTagLink tags={tags} />
      </div>

      <div className={styles.mainContent}>
        <NoContents contents={posts} />

        {posts.map(post => {
          return (
            <div className={styles.postIndex} key={post.Slug}>
              <div className={styles.postLeft}>
                <PostTitle post={post} />
              </div>
              <div className={styles.postRight}>
                <PostTags post={post} />
                <PostDate post={post} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RenderPosts
