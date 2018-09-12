$(() => {
  var jobContainer = $('.job-container');

  function renderPage() {
    $.get('/api/jobs/saved')
    .then(results => {
      if (results.length > 0) {
        renderSavedJobs(results);
      } else {
        renderNone();
      }
    });
  };

  function renderSavedJobs(jobs) {
    jobs.forEach(element => {
      var card = $('<div class="card">');
      var cardHeader = $('<div class="card-header">');
      var cardBody = $('<div class="card-body">');

      cardHeader.append(
        $('<h4>').append(
          $('<a class="job-link">')
          .attr('href', element.link)
          .text(element.company),
          $('<a class="btn btn-danger removeSaved">Remove From Saved</a>').attr(
            'data-id', element._id),
          $('<a class="btn btn-warning jobNotes">Job Notes</a>').attr(
            'data-id', element._id)
        )
      );

      cardBody.html(
        $('<p>').text(element.position)
      );

      card.append(
        cardHeader,
        cardBody
      );

      jobContainer.append(card)
    });
  };

  function renderNone() {
    var emptyContainer = $(
      [
        '<div class="alert alert-danger text-center">',
        "<h4>No jobs have been saved yet!</h4>",
        '</div>',
        '<div class="card">',
        '<div class="card-header text-center">',
        '<h3>Browse some job listings so you can save them for later.</h3>',
        '</div>',
        '<div class="card-body text-center">',
        '<h4><a href="/" class="homeButton">Browse Job Listings</a></h4>',
        '</div>',
        '</div>'
      ].join(''));
      jobContainer.append(emptyContainer);
  };



  renderPage();
});