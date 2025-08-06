interface CreatePostInput {
  title: string;
  body: string;
}

interface CreatePostResponse {
  createPost: {
    id: string;
    title: string;
    body: string;
  };
}