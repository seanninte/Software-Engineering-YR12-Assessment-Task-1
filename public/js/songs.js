function escapeHTML (str) {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderSongs(rows) {
  const tbody = document.getElementById('songs-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHTML(r.title)}</td>
      <td>${escapeHTML(r.artist)}</td>
      <td>${escapeHTML(r.album)}</td>
      <td>${escapeHTML(r.genre)}</td>
    `;
    tbody.appendChild(tr);
  });
}

fetch('/songs')
  .then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  })
  .then(data => renderSongs(data))
  .catch(err => {
    console.error('Failed to load songs:', err);
    const tbody = document.getElementById('songs-body');
    if (tbody) tbody.innerHTML = '<tr><td colspan="4">Failed to load songs</td></tr>';
  });
