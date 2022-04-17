import type { NextPage } from 'next';
import Head from 'next/head';
import Date from '../../components/Date';
import { getAllPostIds, getPostData } from '../../lib/post';

type IProps = {
  postData: IPostData;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: IPostId) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);
  return {
    props: { postData }
  }
}

const Post: NextPage<IProps> = ({ postData }) => {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div>{postData.title}</div>
      <br />
      <div>{postData.id}</div>
      <br />
      <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  )
}

export default Post;
