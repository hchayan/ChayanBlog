import React, { useEffect, useState } from "react";
import { dbService } from "blogFirebase.js";

const Post = ({ match }) => {
  const postID = match.params.id;
  const [contents, setContents] = useState([]);

  const getPost = async () => {
    console.log(postID);
    const post = await dbService
      .collection("posts")
      .where("title", "==", `# ${postID}`)
      .get();

    post.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      setContents([doc.data().contents]);
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="post">
      {contents.length !== 0 &&
        contents.map(content => <div className="post-content">{content}</div>)}
    </div>
  );
};

export default Post;
