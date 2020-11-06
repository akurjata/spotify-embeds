// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {  
  $('form').submit(function(event) {
    event.preventDefault();
    
    let query = $('input').val();
    let context = $('input[name="context"]:checked').val();
    
    $.get('/search?' + $.param({context: context, query: query}), function(data) {
      $('input[type="text"]').val('');
      $('input').focus();
      $('#results').empty();
      
      data.artists.items.forEach(artist => {
        let a = $("<a>");
        a.attr("href", artist.external_urls.spotify);
        a.text(`${artist.name}`);
        a.bind("click", e => {
          e.preventDefault();

          let iframe = $("<iframe>");
          iframe.attr('src', "https://open.spotify.com/follow/1/?uri=spotify:artist:" + artist.id + "&size=detail&theme=light");
          iframe.attr('width', 300);
          iframe.attr('height', 56);
          iframe.attr('scrolling', 'no');
          iframe.attr('frameborder', 0);
          iframe.attr('allowtransparency', true);
          iframe.css({ border: 'none', overflow: 'hidden' });
          $(".embed-example").html(iframe);

          $(".embed-code").html("<pre><code></code></pre>");
          $(".embed-code > pre > code").text($('<div>').append(iframe.clone()).html());
        });

        $("<li>").html(a).appendTo("#results");
      });
    });
  });

});
