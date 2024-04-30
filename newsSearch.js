const apikey='603df0e530344e01a5c8e389602af0d2';
const BlogContainer=document.getElementById("blogContainer");
const searchField = document.getElementById('searchinput');
const searchButton = document.getElementById('searchButton');
async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching random news",error);
        return []
    }
}
searchButton.addEventListener('click',async()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles=await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.error("Error fetching news by query",error);
        }
    }
})
async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching random news",error);
        return []
    }
}
function displayBlogs(articles){
    BlogContainer.innerHTML="";
    articles.forEach((article) => {
        const blogCards = document.createElement("div");
        blogCards.classList.add("blogCard")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const trucatedTitle = article.title.length>30?article.title.slice(0,30)+"...":article.title;
        title.textContent = trucatedTitle;
        const description = document.createElement("p")
        // const trucatedDes = article.description.length>120?article.description.slice(0,120)+"...":article.description;
        description.textContent = article.description;

        blogCards.appendChild(img);
        blogCards.appendChild(title);
        blogCards.appendChild(description);
        blogCards.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        })
        BlogContainer.appendChild(blogCards);
    });
}
(async()=>{
    try{
        const articles =  await fetchRandomNews()
        displayBlogs(articles)
    }catch(error){
        console.error("Error fetching random news",error);
    }
})();