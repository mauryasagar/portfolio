/* Latest Dev.to posts */
(function(){
  var DEVTO_USER='mauryasagar', WRITING_COUNT=3, CACHE_MIN=10;
  var list=document.getElementById('wr-list'), KEY='devto-posts-'+DEVTO_USER+'-'+WRITING_COUNT;
  if(!list){ console.warn('[writing] #wr-list not found in index.html'); return; }

  function show(posts){
    list.className='wr-list'; list.textContent='';
    posts.slice(0,WRITING_COUNT).forEach(function(p){
      var li=document.createElement('li'), a=document.createElement('a'), row=document.createElement('div');
      a.href=p.url; a.target='_blank'; a.rel='noopener'; row.className='wr-line';
      var h=document.createElement('h3'); h.textContent=p.title;
      var lead=document.createElement('span'); lead.className='wr-lead';
      var d=document.createElement('span'); d.className='wr-date';
      d.textContent=new Date(p.published_at.length===10?p.published_at+'T12:00:00':p.published_at).toLocaleDateString('en-US',{month:'short',day:'numeric'});
      row.appendChild(h); row.appendChild(lead); row.appendChild(d); a.appendChild(row);
      if(p.description){var t=document.createElement('p'); t.textContent=p.description; a.appendChild(t);}
      li.appendChild(a); list.appendChild(li);
    });
  }
  function fail(){
    list.className='wr-list is-empty'; list.textContent='';
    var li=document.createElement('li'); li.className='wr-msg';
    li.textContent="Couldn't load posts right now. Read them on Dev.to with the button.";
    list.appendChild(li);
  }

  try{ var c=JSON.parse(localStorage.getItem(KEY)||'null');
       if(c && Date.now()-c.t < CACHE_MIN*60000 && c.posts && c.posts.length){ show(c.posts); return; } }catch(e){}

  fetch('https://dev.to/api/articles?username='+DEVTO_USER+'&per_page='+WRITING_COUNT)
    .then(function(r){ if(!r.ok) throw new Error('Dev.to API answered '+r.status); return r.json(); })
    .then(function(posts){
      if(!posts.length) throw new Error('Dev.to returned no posts for '+DEVTO_USER);
      show(posts);
      try{ localStorage.setItem(KEY,JSON.stringify({t:Date.now(),posts:posts.map(function(p){
        return {title:p.title,description:p.description,url:p.url,published_at:p.published_at}; })})); }catch(e){}
    })
    .catch(function(err){ console.warn('Dev.to posts could not be loaded:',err); fail(); });
})();