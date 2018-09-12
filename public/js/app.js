$(() => {

  var jobContainer = $(".job-container");

  function renderPage() {
    $.get('/api/jobs')
    .then((results) => {
      if (results.length > 0) {
        // console.log(results);
        renderJobs(results);
      } else {
        renderNone();
      }
    });
  };

  function renderJobs(jobs) {
    jobs.forEach(element => {
      if (!element.saved){
        var card = $('<div class="card">');
        var cardHeader = $('<div class="card-header">');
        var cardBody = $('<div class="card-body">');
    
        cardHeader.append(
          $('<h4>').append(
            $('<a class="job-link">')
            .attr('href', element.link)
            .text(element.company),
            $('<a class="btn saveJob">Save Job</a>').attr(
              "data-id", element._id
            )
          )
        );
    
        cardBody.html(
          $('<p>').text(element.position)
        );
    
        card.append(
          cardHeader,
          cardBody
        );
        
        jobContainer.append(card);
      }
    });
  };

  function renderNone() {
    var emptyContainer = $(
      [
        '<div class="alert alert-danger text-center">',
        "<h4>No jobs have been scraped yet! Get scrapin' or check out your saved job listings.</h4>",
        '</div>',
        '<div class="card">',
        '<div class="card-header text-center">',
        '<h3>What Would You Like To Do?</h3>',
        '</div>',
        '<div class="card-body text-center">',
        '<h4><a href="/scrape" class="startScrape emptyButton">Try Scraping New Articles</a></h4>',
        '<h4><a href="/saved" class="goToSaved emptyButton">Go to Saved Articles</a></h4>',
        '</div>',
        '</div>'
      ].join('')
    );
    jobContainer.append(emptyContainer);
    // jobContainer.append(
    //   '<div class="alert alert-danger text-center>',
    //     "<h4>No jobs have been scraped yet! Get scrapin' or check out your saved job listings.",
    //   '</div>',
    //   '<div class="card">',
    //     '<div class="card-header text-center">',
    //       '<h3>What would you like to do?</h3>',
    //     '</div>',
    //     '<div class="card-body text-center">',
    //       '<h4><a class="btn startScrape">Scrape For Some Jobs!</a></h4>',
    //       '<h4><a class="btn goToSaved">Go To Saved Jobs!</a></h4>',
    //     '</div>',
    //   '</div>'
    // );
  };

  $(document).on('click', '.saveJob', function() {
    var savedJob = $(this).data();
    savedJob.saved = true;
    $.ajax({
      method: 'POST',
      url: '/api/jobs/' + savedJob.id,
      data: savedJob
    }).then((data) => {
      console.log(`Promise line 90`)
      console.log(data);
    });
    $(this).parents('.card').remove();
  });

  renderPage();
})