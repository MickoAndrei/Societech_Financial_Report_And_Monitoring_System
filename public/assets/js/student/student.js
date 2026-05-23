/**
 * Student Portal Utilities
 * 
 * This file is loaded on all student pages.
 * Additional functionality is provided by:
 * - student-bar.js (sidebar, profile menu, logout)
 * - student-session.js (session management, role detection)
 * 
 * CSS styling is loaded separately from assets/css/student.css
 */

console.log('Student portal page loaded');

// Generic table loader and empty-state helpers
window.StudentUI = (function () {
	function makeLoaderRow(colspan) {
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		td.colSpan = colspan || 6;
		td.style.textAlign = 'center';
		td.innerHTML = `
			<div class="tableLoader">
				<svg class="spinner" width="40" height="40" viewBox="0 0 50 50">
					<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
				</svg>
				<div class="loaderText">Loading…</div>
			</div>`;
		tr.appendChild(td);
		return tr;
	}

	function makeEmptyRow(message, colspan) {
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		td.colSpan = colspan || 6;
		td.style.textAlign = 'center';
		td.innerHTML = `
			<div class="tableEmpty">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M3 7h18M8 7v10a1 1 0 001 1h6a1 1 0 001-1V7" stroke-linecap="round" stroke-linejoin="round"></path>
					<path d="M12 11v4" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
				<div class="emptyText">${message || 'No data available'}</div>
			</div>`;
		tr.appendChild(td);
		return tr;
	}

	function showLoading(tableSelector) {
		const table = document.querySelector(tableSelector);
		if (!table) return;
		const tbody = table.querySelector('tbody') || table;
		tbody.dataset.loading = '1';
		tbody.innerHTML = '';
		const cols = table.querySelectorAll('thead th').length || 6;
		tbody.appendChild(makeLoaderRow(cols));
	}

	function showEmpty(tableSelector, message) {
		const table = document.querySelector(tableSelector);
		if (!table) return;
		const tbody = table.querySelector('tbody') || table;
		delete tbody.dataset.loading;
		tbody.innerHTML = '';
		const cols = table.querySelectorAll('thead th').length || 6;
		tbody.appendChild(makeEmptyRow(message, cols));
	}

	function clearState(tableOrSelector) {
		const table = typeof tableOrSelector === 'string' ? document.querySelector(tableOrSelector) : tableOrSelector;
		if (!table) return;
		const tbody = table.querySelector('tbody') || table;
		delete tbody.dataset.loading;
		tbody.innerHTML = '';
	}

	// Wire to known events
	function findTablesByKeyword(keyword) {
		const tables = Array.from(document.querySelectorAll('.studentTable'));
		return tables.filter((t) => {
			const id = (t.id || '').toLowerCase();
			const classes = (t.className || '').toLowerCase();
			return id.includes(keyword) || classes.includes(keyword);
		});
	}

	function showLoadingForKeyword(keyword) {
		const tables = findTablesByKeyword(keyword);
		if (tables.length === 0) return;
		tables.forEach((tbl) => {
			const tbody = tbl.querySelector('tbody') || tbl;
			tbody.dataset.loading = '1';
			tbody.innerHTML = '';
			const cols = tbl.querySelectorAll('thead th').length || (tbl.querySelector('tbody tr td') ? tbl.querySelector('tbody tr td').cellIndex + 1 : 6);
			tbody.appendChild(makeLoaderRow(cols));
		});
	}

	function showEmptyForKeyword(keyword, message) {
		const tables = findTablesByKeyword(keyword);
		if (tables.length === 0) return;
		tables.forEach((tbl) => {
			const tbody = tbl.querySelector('tbody') || tbl;
			delete tbody.dataset.loading;
			tbody.innerHTML = '';
			const cols = tbl.querySelectorAll('thead th').length || 6;
			tbody.appendChild(makeEmptyRow(message, cols));
		});
	}

	window.addEventListener('societech-payments-loading', function () {
		showLoadingForKeyword('payment');
	});

	window.addEventListener('societech-payments-changed', function () {
		setTimeout(function () {
			const paymentsExist = (window.SocietechPayments && window.SocietechPayments.getPayments().length > 0) || false;
			if (!paymentsExist) {
				showEmptyForKeyword('payment', 'No payments found');
			} else {
				findTablesByKeyword('payment').forEach((t) => clearState(t));
			}
		}, 50);
	});

	window.addEventListener('societech-rosters-loading', function () {
		showLoadingForKeyword('roster');
		showLoadingForKeyword('section');
	});

	window.addEventListener('societech-rosters-changed', function () {
		setTimeout(function () {
			const anySections = (window.ClassRosters && window.ClassRosters.getAllSections().length > 0) || false;
			if (!anySections) {
				showEmptyForKeyword('section', 'No sections found');
				showEmptyForKeyword('roster', 'No students in this section');
			} else {
				findTablesByKeyword('section').forEach((t) => clearState(t));
				findTablesByKeyword('roster').forEach((t) => clearState(t));
			}
		}, 50);
	});

	// On initial load, ensure empty tables render an empty-state row so they don't collapse
	function ensureEmptyTables() {
		Array.from(document.querySelectorAll('.studentTable')).forEach((tbl) => {
			const tbody = tbl.querySelector('tbody') || tbl;
			if (!tbody) return;
			if (tbody.children.length === 0) {
				const cols = tbl.querySelectorAll('thead th').length || 6;
				tbody.appendChild(makeEmptyRow('No data', cols));
			}
		});
	}

	document.addEventListener('DOMContentLoaded', function () { ensureEmptyTables(); });

	return { showLoading, showEmpty, clearState };
})();
