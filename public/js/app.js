$(() => {

  var jobContainer = $(".job-container");

  function renderPage() {
    $.get('/api/jobs')
    .then((results) => {
      if (results.length > 0) {
        console.log(results);
        //Use a function to display each job posting
        renderJobs(results);
      } else {
        console.log(`No results. Need to scrape!`);
        //Use a function to display divs when there are no job postings
      }
    });
  };

  function renderJobs(jobs) {
    for (var i = 0; i < jobs.length; i++) {
      var card = $('<div class="card">');
      var cardHeader = $('<div class="card-header">');
      var cardBody = $('<div class="card-body">');
  
      cardHeader.append(
        $('<h4>').append(
          $('<a class="job-link">')
          .attr('href', jobs[i].link)
          .text(jobs[i].company),
          $('<a class="btn saveJob">Save Job</a>')
        )
      );
  
      cardBody.html(
        $('<p>').text(jobs[i].position)
      );
  
      card.append(
        cardHeader,
        cardBody
      );
  
      jobContainer.append(card);
    }
  };

  renderPage();
})