const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => viewCategory(data.data.news_category))
    .catch(error => console.log(error))
}

const viewCategory = categoryData => {
    const categoryDisplay = document.getElementById('category');
    const category =[];
    categoryData.forEach(data => {
        const{category_name,category_id} = data;                    
        category.push(category_name);        
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="hover:text-blue-600 cursor-pointer p-5 text-center" onclick=loadNews("${category_id}")>${category_name}</a>
        `;
        categoryDisplay.appendChild(div);

    } )
}

const loadNews = (category_id)  => {
    // Spinner section
    document.getElementById('spinner').style.display= "block"; 
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => viewNews(data.data))
    .catch(error => console.log(error))
}

const viewNews = (newsData) => {
    const newsDisplay = document.getElementById('news');
    newsDisplay.innerHTML ="";
    newsData.sort((a,b)=>{
        return b.total_view - a.total_view;
      })
    
    
      
    document.getElementById('spinner').style.display= "none";
    document.getElementById('count').innerText = newsData.length
    newsData.forEach(news => {
        const div = document.createElement('div');
        const {author,details,image_url,_id,title,total_view} = news;
        div.innerHTML =`
        <div
            class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:w-10/12 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-auto p-5 m-5"         
          >
            <img
              class="object-cover w-full h-96 rounded-t-lg md:h-80 md:w-96 md:rounded-none md:rounded-l-lg"
              src="${image_url}"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                ${title}
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                ${details.slice(0,250)? details.slice(0,250)+"..." : details}
              </p>
                <div class="flex justify-between w-9/12">
                  <div class="flex">
                    <img src="${author.img}" class="w-8 rounded-xl m-2">
                    <div class="text-white">
                      <h4 class="text-lg font-bold"> ${author.name ? author.name :"N/A"} </h4>
                      <p>${author.published_date ? author.published_date : "N/A" }</p>
                    </div>
                  </div>
                  <div class='text-white text-lg text-bold flex items-center'>
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <h4 class=" m-2">${total_view ? total_view : "No views"}</h4>
                  </div>
                </div>
                <label for="${_id}" class="btn modal-button m-5">Read Full news</label>
            </div>
            
            
            
            <input type="checkbox" id="${_id}" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box">
                <img
                class="object-cover w-full h-96 rounded-t-lg md:h-80 md:w-96 md:rounded-none md:rounded-l-lg"
                src="${image_url}"
                alt=""
              />
              <div class="flex flex-col justify-between p-4 leading-normal">
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  ${title}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-700">
                  ${details}
                </p>
                  <div class="flex justify-between w-9/12">
                    <div class="flex">
                      <img src="${author.img}" class="w-8 rounded-xl m-2">
                      <div class="">
                        <h4 class="text-lg font-bold"> ${author.name ? author.name :"N/A"} </h4>
                        <p>${author.published_date ? author.published_date : "N/A" }</p>
                      </div>
                    </div>
                    <div class='text-lg text-bold flex items-center'>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    <h4 class=" m-2">${total_view ? total_view : "No views"}</h4>
                    </div>
                  </div>
                  <div class="modal-action">
                    <label for="${_id}" class="btn">Cancel</label>
                  </div>
                </div>
              </div>
          </div>
        `;
        newsDisplay.appendChild(div);
    })
    

}

const blogShow=()=>{
  document.getElementById('blog').style.display= "block";
  document.getElementById('news').style.display="none"
  document.getElementById('category').style.display="none"
  document.getElementById('total-news').style.display="none"
}
const blogHide =()=>{
  document.getElementById('blog').style.display= "none";
  document.getElementById('news').style.display="block"
  document.getElementById('category').style.display="flex"
  document.getElementById('total-news').style.display="block"
}

loadNews('08')
loadData()

