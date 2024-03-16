function loadPosts() {
  fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    .then((res) => res.json())
    .then((data) => displayPosts(data.posts));
}
// search
function searchPosts(value) {
  fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`)
    .then((res) => res.json())
    .then((data) => displayPosts(data.posts))

  console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`)
}


function displayPosts(data) {
  const postContainer = document.getElementById("post-container");
  const favDiv = document.getElementById("fav-div");
  const read = document.getElementById("read");
  const searchLoader = document.getElementById('search-loader');
  const searchBtn = document.getElementById('sort-button');



  let readCount = 1;
  postContainer.innerHTML = "";

  for (const post of data) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("sort-post");

    postDiv.innerHTML = `
        <div class="flex gap-5 w-full lg:w-4/5 bg-gray-200 p-2 md:p-5 my-5 rounded-xl shadow-xl">
          <div class="auth-image min-h-16 max-h-16 min-w-16 max-w-16 bg-[url('${post.image}')] bg-no-repeat bg-cover rounded-xl flex justify-end">
            <div class="bg-red-700 w-4 h-4 rounded-full mr-[-5px] mt-[-5px]" id = "dot-${post.id}"></div>
          </div>

          <div class="post-content space-y-4 w-auto md:w-full ">
            <div class="flex gap-4 md:gap-10 flex-wrap md:flex-nowrap">
              <p id="${post.category}" class="category">#${post.category}</p>
              <p>Author: ${post.author.name}</p>
            </div>

            <h1 class="text-2xl font-bold">${post.title}Title</h1>
            <p>${post.description}</p>

            <hr class="border-black border-dashed">

            <div class="flex justify-between gap-4 flex-wrap md:flex-nowrap">
              <div class="post-info flex gap-4 flex-wrap md:flex-nowrap">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-message"></i>
                  <p>${post.comment_count}</p>
                </div>

                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-eye"></i>
                  <p>${post.view_count}</p>
                </div>

                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-clock"></i>
                  <p>${post.posted_time}</p>
                </div>
              </div>

              <div class="bg-green-500 p-2 rounded-full add-fav-btn" id="${post.id}">
                <i class="fa-solid fa-envelope"></i>
              </div>
            </div>
          </div>
        </div>`;
    postContainer.appendChild(postDiv);

    // marker red and green
    const dot = document.getElementById(`dot-${post.id}`);
    if (post.isActive === true) {
      dot.classList.remove("bg-red-700");
      dot.classList.add("bg-green-700");
    }

    const addToFavBtn = document.getElementById(`${post.id}`);

    addToFavBtn.onclick = function () {
      const addFav = document.createElement("div");
      addFav.innerHTML = `
        <div class = "flex justify-between bg-white p-2 my-3 rounded-xl shadow-xl">
        <h3 class = "font-bold">${post.title}</h3>
            <div class="flex items-center gap-2">
                  <i class="fa-solid fa-eye"></i>
                  <p>${post.view_count}</p>
            </div>
        </div>
        `;
      favDiv.appendChild(addFav);

      read.innerText = readCount;
      readCount++;
    };

  }

  // sort


  searchBtn.addEventListener('click', function () {

    const searchInput = document.getElementById('sort-input');
    const value = searchInput.value;
    searchPosts(value);

    // loader 

    searchLoader.classList.remove('hidden');
    document.getElementById('new-post-container').classList.add('hidden')

    function removeSearchLoader() {
      searchLoader.classList.add('hidden');
      document.getElementById('new-post-container').classList.remove('hidden')
    }

    setTimeout(function () { searchPosts(value); }, 2000);

    setTimeout(function () { removeSearchLoader(); }, 2000);

  })


}


  // show loader

  function removeLoader() {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden')
  }

  setTimeout(function () { loadPosts(); }, 2000);

  setTimeout(function () { removeLoader(); }, 2000);
