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

  function renderNotes(data) {
    var notes = [];
    var currentNote;

    if(data.notes.length === 0){
      currentNote = $('<li class="list-group-item">No notes have been saved yet.</li>');
      notes.push(currentNote);
    } else {
      data.notes.forEach(element => {
        currentNote = $('<li class="list-group-item jobNote">')
        .text(element.body)
        .append($('<button class="btn btn-danger">X</button>'));

        currentNote.children('button').attr('data-id', element._id);

        notes.push(currentNote);

      })
    }
    $('.noteContainer').append(notes);
  }

  $(document).on('click', '.removeSaved', function() {
    console.log($(this))
    var jobToDelete = $(this).data();
    jobToDelete.saved = false;
    $.ajax({
      method: 'POST',
      url: '/api/jobs/' + jobToDelete.id,
      data: jobToDelete
    }).then(data => {
      console.log(`promise line 94`);
      console.log(data);
    });
    $(this).parents('.card').remove();
  })

  renderPage();
});