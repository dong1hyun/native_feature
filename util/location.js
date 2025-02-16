const GOOGLE_API_KEY = 'AIzaSyDt9irlVNOaAxtxahADWw7qeBiQob2ziRQ';

function getMapPreview({ lat, lng }) {
    console.log(lat, lng)
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

    return imagePreviewUrl;
};

export default getMapPreview;