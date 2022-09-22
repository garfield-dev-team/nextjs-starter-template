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
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col justify-center relative overflow-hidden lg:py-12">
      <div className="relative w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
        <article className="mt-8 prose prose-slate mx-auto lg:prose-lg">
          <Head>
            <title>{postData.title}</title>
          </Head>
          <h1>{postData.title}</h1>
          <br />
          <Date dateString={postData.date} />
          <br />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    </div>
  )
}

export default Post;
