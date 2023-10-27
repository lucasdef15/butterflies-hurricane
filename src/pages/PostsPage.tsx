import { AnimatePresence, motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';
import React, { useContext, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { CircularProgress, Divider, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ListPostCard from '../components/blog/cards/ListPostCard';
import HeaderSearchBar from '../components/blog/headers/Searchbar/HeaderSearchBar';
import PostsContext from '../contexts/PostsContext';
import MainContext from '../contexts/MainContext';
import PostCard from '../components/blog/cards/PostCard';

export default function PostsPage() {
  const cat = useLocation().search;

  const { posts, setPost, loading, setLoading, fetchpost, query } =
    useContext(PostsContext);

  const { isList, isBlock, darkMode } = useContext(MainContext);

  const filteredItems = posts.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja exlcuir essa Post?'
    );
    if (confirmed) {
      try {
        await axios.delete(`/posts/${id}`);
        setPost(posts?.filter((post) => post.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchInit = async () => {
      setLoading(true);
      await fetchpost(cat);
    };
    fetchInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  const ArticleStyles = {
    marginBlock: '2rem',
    width: '100%',
    zIndex: -1,
    position: 'relative',
    maxWidth: '1700px',
  };

  return (
    <>
      <HeaderSearchBar />
      <Divider sx={{ mt: { xs: 0, sm: 1 } }} />
      <motion.div
        className='guiasWrapper'
        variants={routesVariants}
        initial='initial'
        animate='visible'
        exit='exit'
        style={{
          height: '100%',
          width: '100%',
          zIndex: '-1',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          // paddingInline: {xs: 0, sm: '2rem'},
        }}
      >
        <Stack
          sx={ArticleStyles}
          direction='row'
          justifyContent='center'
          flexWrap='wrap'
          useFlexGap
          spacing={4}
        >
          <AnimatePresence>
            {loading ? (
              <CircularProgress size={25} thickness={2} />
            ) : filteredItems.length ? (
              filteredItems.map((post) => (
                <React.Fragment key={post.id}>
                  {isList && (
                    <ListPostCard
                      id={post.id}
                      title={post.title}
                      img={post.img}
                      desc={post.desc}
                      handleDelete={handleDelete}
                    />
                  )}
                  {isBlock && (
                    <PostCard
                      id={post.id}
                      title={post.title}
                      img={post.img}
                      desc={post.desc}
                      handleDelete={handleDelete}
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                flexWrap='wrap'
                sx={{ color: darkMode ? '#fff' : '' }}
              >
                <p>Nenhuma Publicação Encontrada</p>
              </Stack>
            )}
          </AnimatePresence>
        </Stack>
      </motion.div>
    </>
  );
}
