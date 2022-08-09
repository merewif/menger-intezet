/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useParsePost, { ParsedPosts } from "../../../hooks/useParsePost";
import { PostsContext } from "../../../pages/_app";
import { Post } from "../../../types/PostResponse";
import styles from "./FeaturedPosts.module.scss";
import parse from "html-react-parser";
import LoadingBackdrop from "../../LoadingBackdrop";

export default function FeaturedPosts() {
  const [pauseAutoHighlight, setPauseAutoHighlight] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const recentPosts: Array<Post> = useContext(PostsContext).slice(0, 3);
  const parsedPostData = [
    useParsePost(recentPosts[0]?.slug),
    useParsePost(recentPosts[1]?.slug),
    useParsePost(recentPosts[2]?.slug),
  ];
  const router = useRouter();

  useEffect(() => {
    displayNextPost();
  }, []);

  useEffect(() => {
    const timeout = displayNextPost();
    return () => clearTimeout(timeout);
  }, [currentPost, pauseAutoHighlight]);

  const displayNextPost = () => {
    if (pauseAutoHighlight) {
      return;
    }
    const timeout = setTimeout(() => {
      if (parsedPostData.length > currentPost + 1) {
        setCurrentPost(currentPost + 1);
        return;
      }
      setCurrentPost(0);
    }, 5000);

    return timeout;
  };

  function onClick(index: number) {
    setLoading(true);
    router
      .push(`/posts/${recentPosts[index].slug}`)
      .then(() => setLoading(false));
  }

  return (
    <>
      <div className={styles.featuredPostsContainer}>
        <img
          src={parsedPostData[currentPost].image}
          alt={parsedPostData[currentPost].title}
          onClick={() => onClick(currentPost)}
        />
        <div className={styles.textContainer}>
          {parsedPostData.map((post: ParsedPosts, index: number) => {
            return (
              <div
                key={index}
                className={
                  currentPost === index
                    ? styles.highlightedText
                    : styles.regularText
                }
                onMouseOver={() => {
                  setPauseAutoHighlight(true);
                  setCurrentPost(index);
                }}
                onMouseLeave={() => setPauseAutoHighlight(false)}
                onClick={() => onClick(index)}
              >
                <h3 className={styles.author}>{post.author}</h3>
                <h1 className={styles.title}>{parse(post.title)}</h1>
                <span lang="hu" className={styles.excerpt}>
                  {parse(post.excerpt.substring(0, 400).concat("..."))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <LoadingBackdrop open={loading} />
    </>
  );
}
