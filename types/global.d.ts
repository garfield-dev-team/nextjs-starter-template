type IAllPostsData = {
  id: string;
  date: any;
  [key: keyof any]: string;
}[];

type IPostId = {
  params: {
    id: string;
  }
}

type IPostData = {
  id: string;
  contentHtml: string;
  [key: keyof any]: string;
}
