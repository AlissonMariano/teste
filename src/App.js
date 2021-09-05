import React, { useState, useEffect } from 'react';  
import './App.css';
import './index.css';
import Postagem from './components/Reddit/Card/Card.js';
import {fetchPostsFromReddit} from './api/'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// O component que usei pra criar o efeito de tab


export default function App() {
  const [hotPosts, setHotPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [risingPosts, setRisingPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [hotPosts, newPosts, risingPosts] =  await fetchPostsFromReddit();
        setHotPosts(hotPosts.data.children)
        setNewPosts(newPosts.data.children)
        setRisingPosts(risingPosts.data.children);
        // Buscando os dados que vem da API(link) junto com os dados feitos no arquivo da API(index.js);
      } catch(e) {
        setError(true);
        // Caso der erro, retornar alguma mensagem 
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>REACT<span>JS</span></h1>
      <div className="container">
        {error ? <h1>Deu erro</h1> : (
        <Tabs>
          <TabList>
            <Tab>Hot</Tab>
            <Tab>New</Tab>
            <Tab>Rising</Tab>
          </TabList>
          <TabPanel>
            {hotPosts.length > 0 ? hotPosts.map((post, index) => <Postagem key={index} post={post.data} />) : ''}
            {/* Chamada na tela dos posts do hot */}
            <a href="https://www.reddit.com/r/reactjs/hot/" className="btn" target="_blank" rel="noreferrer"><span>+</span> Ver mais</a>
          </TabPanel>
          <TabPanel>
            {newPosts.length > 0 ? newPosts.map((post, index) => <Postagem key={index} post={post.data} />) : ''}
            {/* Chamada na tela dos posts do New */}
            <a href="https://www.reddit.com/r/reactjs/new/" className="btn" target="_blank" rel="noreferrer"><span>+</span> Ver mais</a>
          </TabPanel>
          <TabPanel>
            {risingPosts.length > 0 ? risingPosts.map((post, index) => <Postagem key={index} post={post.data} />) : ''}
            {/* Chamada na tela dos posts do Rising */}
            <a href="https://www.reddit.com/r/reactjs/top/" className="btn" target="_blank" rel="noreferrer"><span>+</span> Ver mais</a>
          </TabPanel>
        </Tabs>
        )}
      </div>
    </div>
  );
}