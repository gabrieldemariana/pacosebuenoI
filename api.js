const DOG_API_KEY = 'live_aXoMZSEcI8LIddlt58nwUEKHcYfD5s8n90klQspyXTAQ6KpoXunZpMCyTfTWM50M';
const DOG_API_URL = 'https://api.thedogapi.com/v1';

async function fetchDogStats() {
    try {
        // Obtener las razas con sus imágenes
        const response = await fetch(`${DOG_API_URL}/breeds?attach_breed=0`, {
            headers: {
                'x-api-key': DOG_API_KEY
            }
        });
        const breeds = await response.json();
        
        // Obtener solo razas que tengan imágenes
        const breedsWithImages = breeds.filter(breed => breed.reference_image_id);
        
        // Obtener 2 razas aleatorias 
        const randomBreeds = breedsWithImages
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);
            
        // Obtener los detalles completos de cada raza, incluyendo las imágenes
        const detailedBreeds = await Promise.all(
            randomBreeds.map(async breed => {
                // Obtener la imagen específica de la raza
                const imageResponse = await fetch(`${DOG_API_URL}/images/${breed.reference_image_id}`, {
                    headers: {
                        'x-api-key': DOG_API_KEY
                    }
                });
                const imageData = await imageResponse.json();

                return {
                    id: breed.id,
                    name: breed.name,
                    temperament: breed.temperament || 'Not specified',
                    origin: breed.origin || 'Unknown',
                    life_span: breed.life_span,
                    weight: breed.weight.metric + ' kg',
                    height: breed.height.metric + ' cm',
                    breed_group: breed.breed_group || 'Not specified',
                    image: imageData.url
                };
            })
        );

        return {
            totalBreeds: breeds.length,
            featuredBreeds: detailedBreeds
        };
    } catch (error) {
        console.error('Error fetching dog stats:', error);
        return null;
    }
}

async function searchBreeds(searchTerm) {
    try {
        // Primero buscar las razas
        const response = await fetch(`${DOG_API_URL}/breeds/search?q=${searchTerm}`, {
            headers: {
                'x-api-key': DOG_API_KEY
            }
        });
        const breeds = await response.json();
        
        // Para la primera raza encontrada, obtener su imagen
        if (breeds.length > 0 && breeds[0].reference_image_id) {
            const imageResponse = await fetch(`${DOG_API_URL}/images/${breeds[0].reference_image_id}`, {
                headers: {
                    'x-api-key': DOG_API_KEY
                }
            });
            const imageData = await imageResponse.json();
            
            // Devolver la raza con todos los datos necesarios
            return [{
                id: breeds[0].id,
                name: breeds[0].name,
                temperament: breeds[0].temperament || 'Not specified',
                origin: breeds[0].origin || 'Unknown',
                life_span: breeds[0].life_span,
                weight: breeds[0].weight.metric + ' kg',
                height: breeds[0].height.metric + ' cm',
                breed_group: breeds[0].breed_group || 'Not specified',
                image: imageData.url
            }];
        }
        return [];
    } catch (error) {
        console.error('Error searching breeds:', error);
        return [];
    }
}

// Función para obtener imágenes aleatorias de perros
async function getRandomDogImages(limit = 3) {
    try {
        const response = await fetch(`${DOG_API_URL}/images/search?limit=${limit}`, {
            headers: {
                'x-api-key': DOG_API_KEY
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching random images:', error);
        return [];
    }
}