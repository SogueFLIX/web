document.addEventListener('DOMContentLoaded', function() {
  // Carrusel de películas
  const carousel = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth;
  const visibleItems = 5;
  const totalItems = items.length;
  
  // Solo inicializar el carrusel en pantallas grandes
  if (window.innerWidth > 767) {
    updateCarousel();
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    function updateCarousel() {
      const offset = -currentIndex * (itemWidth + 20); // 20px de gap
      carousel.style.transform = `translateX(${offset}px)`;
      
      // Ocultar/mostrar botones según la posición
      prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
      nextBtn.style.display = currentIndex >= totalItems - visibleItems ? 'none' : 'flex';
    }
    
    // Inicializar visibilidad de botones
    updateCarousel();
  } else {
    // En móvil, ocultar los botones del carrusel
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
  
  // Efecto hover para las tarjetas de película
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.zIndex = '1';
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Carrusel de películas (código anterior se mantiene)
  
  // Ruleta de películas
  const wheel = document.querySelector('.wheel');
  const spinButton = document.getElementById('spinButton');
  const genreButtons = document.querySelectorAll('.genre-btn');
  const resultContainer = document.querySelector('.result-container');
  const selectedMovieImage = document.getElementById('selectedMovieImage');
  const selectedMovieTitle = document.getElementById('selectedMovieTitle');
  const selectedMovieGenre = document.getElementById('selectedMovieGenre');
  const selectedMovieYear = document.getElementById('selectedMovieYear');
  const selectedMovieRating = document.getElementById('selectedMovieRating');
  const watchButton = document.getElementById('watchButton');
  const spinAgainButton = document.querySelector('.spin-again-btn');
  
  let currentGenre = 'all';
  let isSpinning = false;
  
  // Base de datos de películas (20 películas populares)
  const movies = [
    {
      id: 1,
      title: "Duna",
      genre: "sci-fi",
      year: "2021",
      rating: "8.0/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FyKIG63pXN89EfbTA7yKpwxAU1rf.jpg&w=256&q=75",
      link: "peliculas01/duna.html"
    },
    {
      id: 2,
      title: "The Batman",
      genre: "action",
      year: "2022",
      rating: "7.9/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FgQCrYmvCK7JCLXjCGTMRF5Lzr5c.jpg&w=256&q=75",
      link: "peliculas01/movie002.html"
    },
    {
      id: 3,
      title: "Spider-Man: No Way Home",
      genre: "action",
      year: "2021",
      rating: "8.3/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FeA39qgcH3r2dA9MQMBPwEXS6F86.jpg&w=256&q=75",
      link: "peliculas01/movie003.html"
    },
    {
      id: 4,
      title: "Encanto",
      genre: "comedy",
      year: "2021",
      rating: "7.2/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FsHeJ12wp0QAnY9SviMS4LkLd1TF.jpg&w=256&q=75",
      link: "peliculas01/movie004.html"
    },
    {
      id: 5,
      title: "The Conjuring 3",
      genre: "terror",
      year: "2021",
      rating: "6.3/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F6eGyuK8bHMAB34AIIQOL3wZw8sn.jpg&w=256&q=75",
      link: "peliculas01/movie005.html"
    },
    {
      id: 6,
      title: "Eternals",
      genre: "action",
      year: "2021",
      rating: "6.3/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F2CSdwqOUMH23cEBodqAJynMFz7c.jpg&w=256&q=75",
      link: "peliculas01/movie006.html"
    },
    {
      id: 7,
      title: "No Time to Die",
      genre: "action",
      year: "2021",
      rating: "7.3/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FjIVa5m9s7bKYdI0KH8wFw1qLxHl.jpg&w=256&q=75",
      link: "peliculas01/movie007.html"
    },
    {
      id: 8,
      title: "Venom 2",
      genre: "action",
      year: "2021",
      rating: "6.8/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fuy3ojOX8Ppp4ZFtBZobYxbvIiyn.jpg&w=256&q=75",
      link: "peliculas01/movie008.html"
    },
    {
      id: 9,
      title: "Black Widow",
      genre: "action",
      year: "2021",
      rating: "6.7/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FsGFO6VshDEQ9vX4tOSobLJpkNhq.jpg&w=256&q=75",
      link: "peliculas01/movie009.html"
    },
    {
      id: 10,
      title: "Top Gun: Maverick",
      genre: "action",
      year: "2022",
      rating: "8.3/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FtHoASPhXRGJM6XFvDooJHIFcP3r.jpg&w=256&q=75",
      link: "peliculas01/topgun.html"
    },
    {
      id: 11,
      title: "The Suicide Squad",
      genre: "action",
      year: "2021",
      rating: "7.2/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FtUae3mefrDVTgm5mRzqWnZK6fOP.jpg&w=256&q=75",
      link: "http://sogueflix.com/accion/accionmovies/14.html"
    },
    {
      id: 12,
      title: "Free Guy",
      genre: "comedy",
      year: "2021",
      rating: "7.1/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FrZYYmjgyF5UP1AVsvhzzDOFLCwG.jpg&w=96&q=75",
      link: "http://sogueflix.com/accion/accionmovies/15.html"
    },
    {
      id: 13,
      title: "Shang-Chi",
      genre: "action",
      year: "2021",
      rating: "7.4/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FxCHmhHeO7aOCMlzcNukGH6Q7EiD.jpg&w=96&q=75",
      link: "http://sogueflix.com/accion/accionmovies/16.html"
    },
    {
      id: 14,
      title: "Ghostbusters: Afterlife",
      genre: "comedy",
      year: "2021",
      rating: "7.1/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FefNhiZPk71FTYJ30dBkWMfc939D.jpg&w=256&q=75",
      link: "http://sogueflix.com/Comedia/comedymovies/movie13.html"
    },
    {
      id: 15,
      title: "Red Notice",
      genre: "action",
      year: "2021",
      rating: "6.3/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FsVLSOnGfNXj7VVGBgOz5cNa0lDz.jpg&w=96&q=75",
      link: "http://sogueflix.com/Comedia/comedymovies/movie14.html"
    },
    {
      id: 16,
      title: "A Quiet Place Part II",
      genre: "terror",
      year: "2021",
      rating: "7.3/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FA1DSh29atQjLZCVCddMyGw1mbM8.jpg&w=96&q=75",
      link: "http://sogueflix.com/Comedia/comedymovies/movie15.html"
    },
    {
      id: 17,
      title: "Halloween Kills",
      genre: "terror",
      year: "2021",
      rating: "6.5/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fuyz9qcZdIrUqVrwly3KB5oPUKZO.jpg&w=96&q=75",
      link: "http://sogueflix.com/Comedia/comedymovies/movie16.html"
    },
    {
      id: 18,
      title: "The Night House",
      genre: "terror",
      year: "2021",
      rating: "6.5/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F6ASvxoXlBjWAMDEXC1qw3qkBcbU.jpg&w=96&q=75",
      link: "http://sogueflix.com/generos/terror/vid13.html"
    },
    {
      id: 19,
      title: "Candyman",
      genre: "terror",
      year: "2021",
      rating: "6.5/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F2YcxSIzrz31A3G4PHhm7NYufnUs.jpg&w=96&q=75",
      link: "http://sogueflix.com/generos/terror/vid14.html"
    },
    {
      id: 20,
      title: "Malignant",
      genre: "terror",
      year: "2021",
      rating: "6.3/10",
      image: "https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FinuhmjD8q3EwbK59XxhB82GfXSP.jpg&w=96&q=75",
      link: "http://sogueflix.com/generos/terror/vid15.html"
    }
  ];
  
  // Crear la ruleta
  function createWheel() {
    wheel.innerHTML = '';
    
    // Filtrar películas según el género seleccionado
    let filteredMovies = currentGenre === 'all' 
      ? movies 
      : movies.filter(movie => movie.genre === currentGenre);
    
    // Si hay menos de 20 películas, completar con películas aleatorias
    while (filteredMovies.length < 20) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      if (!filteredMovies.includes(randomMovie)) {
        filteredMovies.push(randomMovie);
      }
    }
    
    // Mezclar las películas y tomar las primeras 20
    filteredMovies = shuffleArray(filteredMovies).slice(0, 20);
    
    // Crear los segmentos de la ruleta
    for (let i = 0; i < 20; i++) {
      const wheelItem = document.createElement('div');
      wheelItem.className = 'wheel-item';
      
      const wheelItemContent = document.createElement('div');
      wheelItemContent.className = 'wheel-item-content';
      
      const img = document.createElement('img');
      img.src = filteredMovies[i].image;
      img.alt = filteredMovies[i].title;
      img.dataset.id = filteredMovies[i].id;
      
      wheelItemContent.appendChild(img);
      wheelItem.appendChild(wheelItemContent);
      wheel.appendChild(wheelItem);
    }
  }
  
  // Mezclar array
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  // Girar la ruleta
  function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinButton.disabled = true;
    
    // Seleccionar una película aleatoria
    const filteredMovies = currentGenre === 'all' 
      ? movies 
      : movies.filter(movie => movie.genre === currentGenre);
    
    const randomMovie = filteredMovies.length > 0
      ? filteredMovies[Math.floor(Math.random() * filteredMovies.length)]
      : movies[Math.floor(Math.random() * movies.length)];
    
    // Calcular la rotación necesaria para que la flecha apunte a la película seleccionada
    const wheelItems = document.querySelectorAll('.wheel-item');
    let selectedIndex = -1;
    
    wheelItems.forEach((item, index) => {
      if (parseInt(item.querySelector('img').dataset.id) === randomMovie.id) {
        selectedIndex = index;
      }
    });
    
    // Si no encontramos la película (no debería pasar), seleccionamos una aleatoria
    if (selectedIndex === -1) {
      selectedIndex = Math.floor(Math.random() * 20);
    }
    
    // Calcular la rotación (cada segmento son 18 grados, queremos que la flecha apunte al centro del segmento)
    const segmentAngle = 18;
    const targetAngle = 360 * 5 + (selectedIndex * segmentAngle + segmentAngle / 2);
    
    // Aplicar la animación
    wheel.style.setProperty('--rotation', `${selectedIndex * segmentAngle + segmentAngle / 2}deg`);
    wheel.style.animation = `wheelSpin 4s cubic-bezier(0.17, 0.67, 0.21, 0.99) forwards`;
    
    // Mostrar el resultado después de la animación
    setTimeout(() => {
      showResult(randomMovie);
      isSpinning = false;
      spinButton.disabled = false;
      wheel.style.animation = '';
    }, 4000);
  }
  
  // Mostrar el resultado
  function showResult(movie) {
    selectedMovieImage.src = movie.image;
    selectedMovieImage.alt = movie.title;
    selectedMovieTitle.textContent = movie.title;
    selectedMovieGenre.textContent = `Género: ${getGenreName(movie.genre)}`;
    selectedMovieYear.textContent = `Año: ${movie.year}`;
    selectedMovieRating.textContent = `Rating: ${movie.rating}`;
    watchButton.href = movie.link;
    
    resultContainer.classList.remove('hidden');
    resultContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Obtener nombre del género
  function getGenreName(genreKey) {
    const genres = {
      'action': 'Acción',
      'comedy': 'Comedia',
      'terror': 'Terror',
      'drama': 'Drama',
      'sci-fi': 'Ciencia Ficción'
    };
    return genres[genreKey] || genreKey;
  }
  
  // Event listeners
  genreButtons.forEach(button => {
    button.addEventListener('click', function() {
      genreButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentGenre = this.dataset.genre;
      createWheel();
    });
  });
  
  spinButton.addEventListener('click', spinWheel);
  
  spinAgainButton.addEventListener('click', function() {
    resultContainer.classList.add('hidden');
  });
  
  // Inicializar la ruleta
  createWheel();
});
