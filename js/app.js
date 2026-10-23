// Dữ liệu mẫu mảng phim (Movie Array Data)
const moviesData = [
    {
        id: 1,
        title: "Hành Trình Vĩ Đại",
        genre: "Hành động",
        year: 2024,
        director: "Nguyễn Minh",
        cast: "Trấn Thành, Thu Trang, Kiều Minh Tuấn",
        description: "Một nhóm đặc nhiệm tham gia vào nhiệm vụ hiểm nghèo để giải cứu thế giới khỏi âm muro đen tối của tổ chức tội phạm xuyên quốc gia.",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Tình Yêu Mùa Hạ",
        genre: "Tình cảm",
        year: 2023,
        director: "Lê Hoàng",
        cast: "Ninh Dương Lan Ngọc, Harry Lu",
        description: "Câu chuyện tình yêu lãng mạn nhưng đầy trắc trở giữa hai người bạn thơ ấu tình cờ gặp lại nhau sau nhiều năm xa cách tại thành phố biển.",
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Bí Ẩn Đêm Không Mây",
        genre: "Kinh dị",
        year: 2024,
        director: "Victor Vũ",
        cast: "Quang Tuấn, Diệu Nhi",
        description: "Gia đình nọ chuyển đến một ngôi nhà cổ vùng ngoại ô và liên tục đối mặt với những hiện tượng siêu nhiên kỳ quái chưa có lời giải đáp.",
        poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Cười Xuyên Biên Giới",
        genre: "Hài hước",
        year: 2023,
        director: "Đức Thịnh",
        cast: "Trường Giang, Hoài Linh",
        description: "Chuyến du lịch bão táp của một gia đình ba thế hệ dẫn đến hàng loạt tình huống dở khóc dở cười và những bài học ý nghĩa về tình cảm.",
        poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Tương Lai Đen Tối",
        genre: "Khoa học viễn tưởng",
        year: 2025,
        director: "Christopher Nolan",
        cast: "Cillian Murphy, Emily Blunt",
        description: "Khi trí tuệ nhân tạo vượt ngoài tầm kiểm soát của con người, một nhóm lập trình viên tài năng phải tìm cách cứu lấy nhân loại trong không gian số.",
        poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Sát Thủ Đơn Độc",
        genre: "Hành động",
        year: 2024,
        director: "Chad Stahelski",
        cast: "Keanu Reeves, Donnie Yen",
        description: "Một cựu sát thủ khét tiếng tái xuất giang hồ để báo thù cho người bạn thân và đối mặt với thế lực ngầm nguy hiểm nhất thế giới.",
        poster: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
    }
];

// DOM Elements
const movieGrid = document.getElementById('movie-grid');
const genreFiltersContainer = document.getElementById('genre-filters');
const searchInput = document.getElementById('search-input');
const noResultsEl = document.getElementById('no-results');
const themeToggleBtn = document.getElementById('theme-toggle');
const movieModal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close');

// --- 1. Hiển thị dữ liệu (Render Movies) ---
function displayMovies(movies) {
    movieGrid.innerHTML = '';
    
    if (movies.length === 0) {
        noResultsEl.classList.remove('hidden');
        return;
    } else {
        noResultsEl.classList.add('hidden');
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.id = movie.id;
        
        card.innerHTML = `
            <div class="movie-poster-wrap">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span>${movie.director}</span>
                </div>
                <span class="movie-genre-tag">${movie.genre}</span>
            </div>
        `;

        // Sự kiện click mở modal chi tiết
        card.addEventListener('click', () => openMovieModal(movie));
        
        movieGrid.appendChild(card);
    });
}

// --- 2. Tự động phát hiện và tạo Checkbox thể loại từ mảng dữ liệu (Không hard-code) ---
function initGenreFilters() {
    // Lấy danh sách thể loại duy nhất từ mảng moviesData
    const genres = [...new Set(moviesData.map(movie => movie.genre))];
    
    genreFiltersContainer.innerHTML = '';
    
    genres.forEach(genre => {
        const label = document.createElement('label');
        label.className = 'genre-item';
        
        label.innerHTML = `
            <input type="checkbox" value="${genre}">
            <span>${genre}</span>
        `;
        
        genreFiltersContainer.appendChild(label);
    });

    // Lắng nghe sự kiện thay đổi trên các checkbox thể loại
    const checkboxes = genreFiltersContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', filterAndSearchMovies);
    });
}

// --- 3 & 4. Tư duy tích hợp (Bộ lọc thể loại và tìm kiếm hoạt động đồng thời) ---
function filterAndSearchMovies() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Lấy danh sách các thể loại đang được check
    const selectedCheckboxes = genreFiltersContainer.querySelectorAll('input[type="checkbox"]:checked');
    const selectedGenres = Array.from(selectedCheckboxes).map(cb => cb.value);

    const filtered = moviesData.filter(movie => {
        // Kiểm tra điều kiện thể loại: Nếu có chọn thể loại thì phim phải thuộc ít nhất một trong các thể loại đã chọn
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
        
        // Kiểm tra điều kiện tìm kiếm theo tên: Tên phim phải chứa từ khóa tìm kiếm
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);

        return matchesGenre && matchesSearch;
    });

    displayMovies(filtered);
}

// --- 5. Tối ưu hóa hiệu năng: Kỹ thuật Debounce cho ô tìm kiếm ---
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Gắn debounce (khoảng 400ms) vào sự kiện nhập liệu ô tìm kiếm
const debouncedSearch = debounce(filterAndSearchMovies, 400);
searchInput.addEventListener('input', debouncedSearch);


// --- Bài 3: Trải nghiệm người dùng và Sáng tạo ---

// A. Cửa sổ Modal chi tiết phim
function openMovieModal(movie) {
    modalBody.innerHTML = `
        <div class="modal-body-grid">
            <img src="${movie.poster}" alt="${movie.title}" class="modal-poster">
            <div class="modal-details">
                <h2>${movie.title}</h2>
                <p><strong>Thể loại:</strong> ${movie.genre}</p>
                <p><strong>Năm phát hành:</strong> ${movie.year}</p>
                <p><strong>Đạo diễn:</strong> ${movie.director}</p>
                <p><strong>Diễn viên:</strong> ${movie.cast}</p>
                <p><strong>Mô tả chi tiết:</strong> ${movie.description}</p>
            </div>
        </div>
    `;
    movieModal.classList.remove('hidden');
}

function closeMovieModal() {
    movieModal.classList.add('hidden');
}

modalCloseBtn.addEventListener('click', closeMovieModal);
// Đóng modal khi click ra vùng nền mờ bên ngoài
movieModal.addEventListener('click', (e) => {
    if (e.target === movieModal) {
        closeMovieModal();
    }
});
// Đóng modal bằng phím ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !movieModal.classList.contains('hidden')) {
        closeMovieModal();
    }
});

// B. Hoàn thiện chức năng Light/Dark Mode với localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

// Khởi chạy ứng dụng khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initGenreFilters();
    displayMovies(moviesData);
});