/**
 * Documentation collapse show active link
 */
function setActiveItem() {
	const { hash } = window.location
	if (hash === '') return;
	const link = document.querySelector(`.bd-aside a[href="${hash}"]`)
	if (!link) return;
	const active = document.querySelector('.bd-aside .active')
	const parent = link.parentNode.parentNode.previousElementSibling
	link.classList.add('active')
	if (parent.classList.contains('collapsed'))
		parent.click()
	if (!active) return;
	const expanded = active.parentNode.parentNode.previousElementSibling
	active.classList.remove('active')
	if (expanded && parent !== expanded) expanded.click();
}
setActiveItem()
window.addEventListener('hashchange', setActiveItem)