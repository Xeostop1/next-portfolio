// services/nasa/epicApi.ts
const NASA_API_KEY = '3HC9lbUjlOcEp6qg8V9byKOYhMeCCzOLTkIYtTyt';

export async function fetchLatestEpicImage() {
  const dateRes = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`);
  const data = await dateRes.json();

  if (!data || data.length === 0) return null;

  const { image, date } = data[0];
  const [year, month, day] = date.split(' ')[0].split('-');

  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${image}.jpg`;

  return imageUrl;
}
