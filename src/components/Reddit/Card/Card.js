import React from 'react';
import './Card.css';
import logo from './bg.jpg';
// Quando nao tiver foto, colocar um fundo cinza.
import moment from 'moment';
// Transportar a data UNIX para a data.
import 'moment/locale/pt-br';
// Traduzir para o português.

function Postagem({ post }){ 
    
    return (
        <div className="postagem">
            <div className="postagens__thumb">
                <figure>
                    <img src={post.thumbnail === 'self' ? logo : post.thumbnail} alt={post.title} />  
                </figure>
            </div>
            <article className="postagem__conteudo">
                <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noreferrer">
                    <h3>{ post.title }</h3>
                    <p>enviado {moment.unix(post.created_utc).fromNow()} por <span>{post.author}</span></p> 
                    <p><strong>{post.domain}</strong></p>
                </a> 
            </article>
        </div>
    )
}
// Estrutura dos posts.

export default Postagem;
