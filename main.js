const form = document.getElementById('search');
const q = document.getElementById('query');
const Search_Button = document.getElementById('Search-Button');
const Main = document.getElementById('content');
const warn = document.getElementById("warn");
//const loader = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&search=walker&include=musicinfo+licenses`;
const Url = `https://fluxtech-youtubeapi.onrender.com`;
function SearchMusic(Url) {
  fetch(Url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; 
            obs.unobserve(img);
          }
        });
      });

      data.items.forEach(video => {
        const div = document.createElement('div');
        div.classList.add('music');

        const vid = typeof video.id === "object" ? video.id.videoId : video.id;
        const watchUrl = `https://www.youtube.com/embed/${vid}?autoplay=1`;
        const thumb = video.snippet.thumbnails.medium.url;
        const channel = video.snippet.channelTitle;
        const title = video.snippet.title || video.snippet.localized?.title || "Untitled";

      
        div.innerHTML = `
          <img data-src="${thumb}" alt="${title}">
          <h2>${title}</h2>
          <h3>${channel}</h3>
        `;

        div.addEventListener('click', e => {
          e.preventDefault();
          div.innerHTML = `
            <iframe src="${watchUrl}" allow="autoplay; fullscreen" frameborder="0"></iframe>
            <h2>${title}</h2>
            <h3>${channel}</h3>
          `;
        });

        Main.appendChild(div);
      });
      document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
    });
}

SearchMusic(Url); 
 
  form.addEventListener('submit', e => {e.preventDefault();
   Main.innerHTML = "";
   const query = q.value.trim();
   const API =`https://fluxtech-youtubeapi.onrender.com/api/youtube?search=${query}`;
   if(query){
   SearchMusic(API)
   q.innerHTML = ""
warn.style.display = "none";
   } else {
   warn.style.display = "block"
     warn.style.color = "red";
     warn.style.fontSize = "30px";
     warn.style.fontWeight = "bold";
    warn.innerHTML = "Provide Input";
   }
  });
   
 

  
   /*Main.innerHTML = "";
   const query = q.value.trim();
    const API =`https://discoveryprovider.audius.co/v1/tracks/search?query=${query}&limit=20`;
   if(query){
   SearchMusic(API)
   q.innerHTML = ""
   } else {
    q.innerHTML = "Provide Input";
   }
  });*/
  
   
 
