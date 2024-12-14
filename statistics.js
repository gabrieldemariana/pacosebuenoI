// Variables globales
let products = [];
let rotationAngle = 0;
let dogStats = null;
let isDragging = false;
let previousMouseX = 0;
let targetRotation = 0;
let currentRotation = 0;

async function setup() {
    const canvas = createCanvas(400, 300, WEBGL);
    canvas.parent('p5-canvas');
    
    // Cargar datos de la API
    dogStats = await fetchDogStats();
    
    // Inicializar productos 3D con ventas más diferenciadas
    products = [
        { name: 'Cat Tree', sales: 150, color: [255, 200, 0], y: -80 },
        { name: 'Dog Bed', sales: 200, color: [0, 255, 200], y: 0 },
        { name: 'Fish Tank', sales: 100, color: [200, 0, 255], y: 80 }
    ];

    canvas.mousePressed(() => {
        isDragging = true;
        previousMouseX = mouseX;
    });
    
    canvas.mouseReleased(() => {
        isDragging = false;
    });

    // Actualizar las estadísticas después de cargar los datos
    if (dogStats) {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsSection.innerHTML = `
                <div class="stat-card">
                    <h4>Total Pets</h4>
                    <div class="number">1,234</div>
                    <div class="label">registered pets</div>
                </div>
                <div class="stat-card">
                    <h4>Happy Customers</h4>
                    <div class="number">987</div>
                    <div class="label">satisfied clients</div>
                </div>
                <div class="stat-card">
                    <h4>Products Sold</h4>
                    <div class="number">5,678</div>
                    <div class="label">items delivered</div>
                </div>
                <div class="stat-card">
                    <h4>Dog Breeds</h4>
                    <div class="number">${dogStats.totalBreeds}</div>
                    <div class="label">different breeds</div>
                </div>
            `;
        }
    }
}

function draw() {
    background(240);
    
    // Iluminación mejorada
    ambientLight(60);
    pointLight(255, 255, 255, 0, 0, 200);
    
    if (isDragging) {
        const deltaX = mouseX - previousMouseX;
        targetRotation += deltaX * 0.01;
        previousMouseX = mouseX;
    }
    
    if (!isDragging) {
        targetRotation += 0.02;
    }
    
    currentRotation = lerp(currentRotation, targetRotation, 0.1);
    rotateY(currentRotation);
    
    // Dibujar productos 3D
    products.forEach((product) => {
        push();
        translate(0, product.y, 0);
        specularMaterial(product.color);
        shininess(30);
        const height = map(product.sales, 0, 200, 20, 100);
        box(40, height, 40);
        pop();
    });
}

// Configuración de Chart.js
document.addEventListener('DOMContentLoaded', async function() {
    // Gráfico de ventas
    const ctx = document.getElementById('sales-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Ventas Mensuales',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: '#FEF200',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Tendencia de Ventas 2024'
                }
            }
        }
    });

    // Actualizar lista de productos populares
    const productList = document.querySelector('.product-list');
    const popularProducts = [
        { name: 'Cat Tree', sales: 150 },
        { name: 'Dog Bed', sales: 120 },
        { name: 'Fish Tank', sales: 90 }
    ];

    popularProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'popular-product';
        item.innerHTML = `
            <h4>${product.name}</h4>
            <p>Ventas: ${product.sales}</p>
        `;
        productList.appendChild(item);
    });

    // Obtener los datos de la API
    const dogData = await fetchDogStats();
    
    if (dogData && dogData.featuredBreeds) {
        // Actualizar el contenedor de razas
        const breedsContainer = document.querySelector('.breeds-container');
        dogData.featuredBreeds.forEach(breed => {
            const breedCard = document.createElement('div');
            breedCard.className = 'breed-card';
            breedCard.innerHTML = `
                <img src="${breed.image || 'placeholder.jpg'}" alt="${breed.name}" class="breed-image">
                <div class="breed-info">
                    <h4>${breed.name}</h4>
                    <p><strong>Temperament:</strong> ${breed.temperament || 'Not specified'}</p>
                    <p><strong>Origin:</strong> ${breed.origin}</p>
                    <p><strong>Life:</strong> ${breed.life_span}</p>
                    <p><strong>Weight:</strong> ${breed.weight}</p>
                    <p><strong>Height:</strong> ${breed.height}</p>
                    <p><strong>Group:</strong> ${breed.breed_group}</p>
                </div>
            `;
            breedsContainer.appendChild(breedCard);
        });
    }
}); 

async function searchBreeds(searchTerm) {
    try {
        const response = await fetch(`${DOG_API_URL}/breeds/search?q=${searchTerm}`, {
            headers: {
                'x-api-key': DOG_API_KEY
            }
        });
        const breeds = await response.json();
        return breeds;
    } catch (error) {
        console.error('Error searching breeds:', error);
        return [];
    }
}

// Añadir el evento de búsqueda
document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.querySelector('#breed-search');
    if (searchInput) {
        // Limpiar el input al cargar la página
        searchInput.value = '';
    }
    
    const breedsContainer = document.querySelector('.breeds-container');
    let searchTimeout;
    let initialBreeds = [];

    // Cargar las razas iniciales
    dogStats = await fetchDogStats();
    if (dogStats && dogStats.featuredBreeds) {
        initialBreeds = dogStats.featuredBreeds;
        displayBreeds(initialBreeds, true);
    }

    if (searchInput) {
        searchInput.addEventListener('input', async (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(async () => {
                const searchTerm = e.target.value.trim();
                
                if (searchTerm.length >= 2) {
                    const searchResults = await searchBreeds(searchTerm);
                    
                    // Mostrar primero las razas iniciales
                    displayBreeds(initialBreeds, true);
                    
                    // Añadir solo el primer resultado de búsqueda que no esté en las iniciales
                    if (searchResults.length > 0) {
                        const newBreed = searchResults.find(searchBreed => 
                            !initialBreeds.some(initialBreed => initialBreed.id === searchBreed.id)
                        );
                        
                        if (newBreed) {
                            displayBreeds([newBreed], false);
                        }
                    }
                } else if (searchTerm.length === 0) {
                    // Si el campo de búsqueda está vacío, mostrar solo las razas iniciales
                    displayBreeds(initialBreeds, true);
                }
            }, 300);
        });
    }
});

function displayBreeds(breeds, clearContainer) {
    const breedsContainer = document.querySelector('.breeds-container');
    
    if (clearContainer) {
        breedsContainer.innerHTML = '';
    }
    
    breeds.forEach(breed => {
        console.log('Displaying breed:', breed); // Para debug
        const breedCard = document.createElement('div');
        breedCard.className = 'breed-card';
        
        // Asegurarnos de que tenemos una URL de imagen
        const imageUrl = breed.image?.url || breed.image || 'https://via.placeholder.com/200x200?text=No+Image';
        
        breedCard.innerHTML = `
            <div class="breed-image-container">
                <img src="${imageUrl}" 
                     alt="${breed.name}" 
                     class="breed-image"
                     onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
            </div>
            <div class="breed-info">
                <h4>${breed.name}</h4>
                <p><strong>Temperament:</strong> ${breed.temperament || 'Not specified'}</p>
                <p><strong>Origin:</strong> ${breed.origin || 'Unknown'}</p>
                <p><strong>Life Span:</strong> ${breed.life_span}</p>
                <p><strong>Weight:</strong> ${breed.weight}</p>
                <p><strong>Height:</strong> ${breed.height}</p>
                <p><strong>Group:</strong> ${breed.breed_group || 'Not specified'}</p>
            </div>
        `;
        breedsContainer.appendChild(breedCard);
    });
}

// Añadir estilos CSS para la imagen
const style = document.createElement('style');
style.textContent = `
    .breed-image-container {
        width: 200px;
        height: 200px;
        overflow: hidden;
        border-radius: 8px;
        margin-right: 20px;
    }

    .breed-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .breed-card {
        display: flex;
        background: white;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .breed-info {
        flex: 1;
    }
`;
document.head.appendChild(style); 