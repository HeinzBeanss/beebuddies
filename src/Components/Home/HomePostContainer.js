import React, { useState, useEffect } from "react";
import Post from "../Shared/Post";

const HomePostContainer = ({ isMobile, guestMode, refreshPostData, setRefreshPostData, userData }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
      setPage(1);
      }
  
    useEffect(() => {
      setRefreshPostData(true);
      setPage(1);
    }, []);
  
    console.log(`HOME PAGE COUNT: ${page}`);
    useEffect(() => {
      if (userData && refreshPostData) {
        const fetchPosts = async () => {
          let url = `http://localhost:4000/api/users/${userData.updatedUser._id}/friends/posts`;
  
          if (guestMode) {
            url += '?guestMode=true';
          }
  
          try {
            const response = await fetch(url);
            const postData = await response.json();
            setPosts(postData);
          } catch (error) {
            console.error('Error fetching posts:', error);
          } finally {
            setRefreshPostData(false);
          }
        };
        fetchPosts();
      }
    }, [userData, refreshPostData]);
  
    const handleScroll = () => {
      if (hasMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setPage(prevPage => prevPage + 1);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [hasMore]);
  
    useEffect(() => {
      if (page > 1) {
        const fetchMorePosts = async () => {
          let url = `http://localhost:4000/api/users/${userData.updatedUser._id}/friends/posts?page=${page}`;
  
          if (guestMode) {
            url += '&guestMode=true';
          }
  
          try {
            const response = await fetch(url);
            const morePosts = await response.json();
            if (morePosts.length === 0) {
              setHasMore(false);
            } else {
              setPosts(prevPosts => [...prevPosts, ...morePosts]);
            }
          } catch (error) {
            console.error('Error fetching more posts:', error);
          }
        };
        fetchMorePosts();
      }
    }, [page, userData, guestMode]);
  
    return (
      <div className="post-section">
        {posts.length > 0 ? (
          posts.map((post, index) => {
            return <Post isMobile={isMobile} guestMode={guestMode} setRefreshData={setRefreshPostData} userData={userData} post={post} key={index} />;
          })
        ) : (
          <div className="home-postcontainer-loading">There are no posts to display!</div>
        )}
      </div>
    );
  };
  
  export default HomePostContainer;