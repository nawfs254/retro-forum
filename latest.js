function latestPosts() {
    fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
        .then((res) => res.json())
        .then((data) => displayLatestPosts(data));
}


function displayLatestPosts(data) {
    const latestPostContainer = document.getElementById('latest-posts')

    for (const latestP of data) {

        const newPostDiv = document.createElement('div')
        newPostDiv.innerHTML =
            `
            <div class="p-5 space-y-4 border-slate-300 border-2 rounded-xl h-[600px] shadow-xl">
                <img src="${latestP.cover_image}" alt="" class="rounded-xl">
                <span class="flex  items-center gap-3"><i class="fa-solid fa-calendar-days"></i> <span id="date" class="dates">${latestP.author.posted_date}</span> </span>
                <p class="font-bold text-2xl">${latestP.title}</p>
                <p>${latestP.description}</p>
                <div class="flex items-center gap-4"> 
                <img src="${latestP.profile_image}" alt="" class="w-16 h-16 rounded-full">
                <div>
                    <p class ="font-bold">${latestP.author.name}</p>
                    <p>${latestP.author.designation}</p>
                </div>
                </div>
            </div>
    `;
        latestPostContainer.appendChild(newPostDiv);

        const dates = document.getElementsByClassName('dates')

        for (const date of dates) {
            // console.log(date.innerText)

            if(date.innerHTML === "undefined"){
                date.innerText = `No publish date`
            }
            
        }
        
    }
}


latestPosts();