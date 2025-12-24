document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('reviews-section');
    if (!section) return;

    // --- LÓGICA DA GALERIA MODAL ---
    const galleryTriggers = section.querySelectorAll('.gallery-trigger');
    const modal = document.getElementById('review-gallery-modal');
    
    if (modal && galleryTriggers.length > 0) {
        const modalImg = modal.querySelector('.modal-current-image');
        const closeBtn = modal.querySelector('.modal-close');
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');
        const overlay = modal.querySelector('.modal-overlay');
        
        // Pega a lista de todas as imagens do atributo data
        const allImagesString = section.getAttribute('data-all-images');
        const allImages = allImagesString ? allImagesString.split(',') : [];
        let currentIndex = 0;

        function openModal(index) {
            currentIndex = index;
            modalImg.src = allImages[currentIndex];
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava o scroll da página
            updateNavButtons();
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Destrava o scroll
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % allImages.length;
            modalImg.src = allImages[currentIndex];
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            modalImg.src = allImages[currentIndex];
        }

        function updateNavButtons() {
            // Se só tiver 1 imagem, esconde as setas
            if (allImages.length <= 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            }
        }

        // Event Listeners
        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                openModal(index);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('reviews-section');
    if (!section) return;

    // --- CARREGAR MAIS ---
    const loadMoreBtn = document.getElementById('btn-load-more');
    const initialLimit = parseInt(section.getAttribute('data-initial-limit'));
    const cards = section.querySelectorAll('.review-card');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            cards.forEach(card => card.classList.remove('is-hidden'));
            loadMoreBtn.parentElement.classList.add('is-hidden');
        });
    }

    // --- GALERIA MODAL ---
    const modal = document.getElementById('review-gallery-modal');
    const triggers = section.querySelectorAll('.gallery-trigger');
    const allImages = section.getAttribute('data-all-images').split(',');

    if (modal && triggers.length > 0) {
        const modalImg = modal.querySelector('.modal-current-image');
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');
        let currentIdx = 0;

        function updateModal(idx) {
            currentIdx = idx;
            modalImg.src = allImages[currentIdx];
        }

        triggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                updateModal(parseInt(this.dataset.index));
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        nextBtn.addEventListener('click', () => updateModal((currentIdx + 1) % allImages.length));
        prevBtn.addEventListener('click', () => updateModal((currentIdx - 1 + allImages.length) % allImages.length));
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});