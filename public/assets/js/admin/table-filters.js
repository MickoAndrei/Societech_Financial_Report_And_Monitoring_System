function updateCounts(table, resultCount, totalId, clearedId, notClearedId) {
  const rows = Array.from(table.querySelectorAll('tbody tr')).filter((r) => r.style.display !== 'none');
  const cleared = rows.filter((r) => r.dataset.status === 'cleared').length;
  const notCleared = rows.filter((r) => r.dataset.status === 'not-cleared').length;

  document.getElementById(totalId).textContent = String(rows.length);
  document.getElementById(clearedId).textContent = String(cleared);
  document.getElementById(notClearedId).textContent = String(notCleared);

  resultCount.textContent = `Showing ${rows.length} student${rows.length === 1 ? '' : 's'}`;
}

function applyFilter(searchInput, table, resultCount, totalId, clearedId, notClearedId) {
  const q = (searchInput.value || '').trim().toLowerCase();
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach((row) => {
    const name = (row.dataset.name || '').toLowerCase();
    const id = (row.dataset.id || '').toLowerCase();
    const match = !q || name.includes(q) || id.includes(q);
    row.style.display = match ? '' : 'none';
  });
  updateCounts(table, resultCount, totalId, clearedId, notClearedId);
}

function setupTableFilters(searchInputId, tableId, resultCountId, totalId, clearedId, notClearedId) {
  const searchInput = document.getElementById(searchInputId);
  const table = document.getElementById(tableId);
  const resultCount = document.getElementById(resultCountId);

  searchInput.addEventListener('input', () => applyFilter(searchInput, table, resultCount, totalId, clearedId, notClearedId));
  updateCounts(table, resultCount, totalId, clearedId, notClearedId);
}
