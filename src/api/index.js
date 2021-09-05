const POST_TYPE_MAP = {
    HOT: 'hot',
    NEW: 'new',
    RISING: 'rising'
}
// Um MAP pra estruturar o link com o efeito de troca

const fetchRedditPostsByType = (type) => {
    if(!POST_TYPE_MAP[type]) throw new Error('Tipo não existe no mapa');

    return fetch(`https://api.reddit.com/r/artificial/${POST_TYPE_MAP[type]}`);
    // Link da api 
};

export const fetchPostsFromReddit = async () => {
    const hotPostsPromise = fetchRedditPostsByType('HOT')
    const newPostsPromise = fetchRedditPostsByType('NEW')
    const risingPostsPromise = fetchRedditPostsByType('RISING')

    const [hotPosts, newPosts, risingPosts] = await Promise.all([hotPostsPromise, newPostsPromise, risingPostsPromise]);
    // Promise all pra dar o await nas 3 const juntas e não uma por uma

    return await Promise.all([hotPosts.json(), newPosts.json(), risingPosts.json()]);
    // O .json necessário pra poder chamar os posts, junto com o promise all.
}