$(() => {

  var jobContainer = $(".job-container");

  function renderPage() {
    $.get('/api/jobs')
    .then((results) => {
      if (results.length > 0) {
        console.log(results);
        //Use a function to display each job posting
      } else {
        console.log(`No results. Need to scrape!`);
        //Use a function to display divs when there are no job postings
      }
    })
  }

  renderPage();
})