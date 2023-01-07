import { NUMBER_OF_POSTS_PER_PAGE } from '../../app/server-constants'
import GoogleAnalytics from '../../components/google-analytics'
import {
  BlogTagLink,
  NoContents,
  PostDate,
  PostIndexTitle,
  PostTags,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getRankedPosts,
  getAllTags,
} from '../../lib/notion/client'

export const revalidate = 60

const BlogPage = async () => {
  const [posts, rankedPosts, tags] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE),
    getRankedPosts(),
    getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle="Blog" />
      <div className={styles.content}>
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

            {posts.filter(post => post.Slug.match(/^(?!_).*$/)).map(post => {
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
    </>

  )
}

export default BlogPage
