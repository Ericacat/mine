        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                }
            });
        });
         window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            nav.style.boxShadow = window.pageYOffset > 100 ? '0 2px 10px rgba(0,0,0,0.05)' : 'none';
        });

        // Lightbox functions
        function openLightbox(element) {
            const img = element.dataset.img;
            const title = element.dataset.title;
            const desc = element.dataset.desc;
            
            if (!img) return;
            
            const lightbox = document.getElementById('lightbox');
            if (!lightbox) {
                createLightbox();
            }
            
            document.getElementById('lightbox-img').src = img;
            document.getElementById('lightbox-title').textContent = title;
            document.getElementById('lightbox-desc').textContent = desc;
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox(event) {
            if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
                document.getElementById('lightbox').classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        function createLightbox() {
            const lightboxHTML = `
                <div class="lightbox" id="lightbox" onclick="closeLightbox(event)">
                    <div class="lightbox-content">
                        <button class="lightbox-close" onclick="closeLightbox(event)">×</button>
                        <img id="lightbox-img" src="" alt="">
                        <div class="lightbox-caption">
                            <h4 id="lightbox-title"></h4>
                            <p id="lightbox-desc"></p>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        }

        // Close lightbox with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const lightbox = document.getElementById('lightbox');
                if (lightbox) {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Create lightbox on page load
        createLightbox();
