const toRoman = (number) => {
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  return romans[number - 1];
}
$.ajax({
  url: 'https://swapi.co/api/films/',
  method: 'get',
  success: response => {
    const sortedFilms = response.results.sort((filmA, filmB) => filmA.episode_id > filmB.episode_id);
    sortedFilms.forEach(film => {
      let $li = $('<li>', {
				'data-episode-url': film.url,
				'text': `Episode ${toRoman(film.episode_id)}: ${film.title}`
      });
      $("#movies ul").append($li);
    });
  },
});

$("#movies ul").click('li', evt => {
  let filmUrl = $(evt.target).data('episode-url');
  $.ajax({
    url: filmUrl,
    method: 'get',
    success: response => {
      $(".reading-animation").html(
        `Episode ${toRoman(response.episode_id)}\n${response.title.toUpperCase()}\n\n${response.opening_crawl}`);
    }
  });
});
