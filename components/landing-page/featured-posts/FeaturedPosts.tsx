/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import useParsePost, {ParsedPosts} from '../../../hooks/useParsePost';
import {PostsContext} from '../../../pages/index';
import {Post} from '../../../types/PostResponse';
import styles from './FeaturedPosts.module.scss';
import parse from 'html-react-parser';
import LoadingBackdrop from '../../LoadingBackdrop';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedPosts() {
  const [pauseAutoHighlight, setPauseAutoHighlight] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const recentPosts: Array<Post> = useContext(PostsContext)?.slice(0, 3);
  const parsedPostData = [
    useParsePost(recentPosts ? recentPosts[0] : undefined),
    useParsePost(recentPosts ? recentPosts[1] : undefined),
    useParsePost(recentPosts ? recentPosts[2] : undefined),
  ];

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

  if (!recentPosts?.length) return <></>;

  return (
    <>
      <div className={styles.featuredPostsContainer}>
        <Link href={`/posts/${recentPosts[currentPost].slug}`}>
          <a className={styles.imageAnchor}>
            <Image
              src={
                parsedPostData[currentPost].image
                  ? parsedPostData[currentPost].image
                  : '/assets/images/logo-rectangle.png'
              }
              alt={parsedPostData[currentPost].title}
              width={1000}
              height={1000}
              objectFit={'contain'}
              priority
            />
          </a>
        </Link>
        <div className={styles.textContainer}>
          {parsedPostData.map((post: ParsedPosts, index: number) => {
            const parsedTitle = parse(post.title);
            const parsedExcerpt = parse(post.excerpt.substring(0, 400).concat('...'));
            return (
              <Link href={`/posts/${recentPosts[index].slug}`} key={index} passHref>
                <div
                  className={currentPost === index ? styles.highlightedText : styles.regularText}
                  onMouseOver={() => {
                    setPauseAutoHighlight(true);
                    setCurrentPost(index);
                  }}
                  onMouseLeave={() => setPauseAutoHighlight(false)}
                >
                  {(parsedTitle && typeof parsedTitle === 'string') ||
                  (Array.isArray(parsedTitle) && parsedTitle.length > 0) ? (
                    <h3 className={styles.author}>{post.author}</h3>
                  ) : null}
                  <h1 className={styles.title}>
                    {parsedTitle && Array.isArray(parsedTitle) && parsedTitle.length > 0
                      ? parsedTitle
                      : post.author}
                  </h1>
                  <span lang="hu" className={styles.excerpt}>
                    {parsedExcerpt}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <LoadingBackdrop open={loading} />
    </>
  );
}
