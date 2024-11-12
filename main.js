import "./css/bootstrap.min.css"
import "./js/bootstrap.bundle.min"
import { bringData } from "./utils/bringData"
const form=document.querySelector('[data-form]')
form.addEventListener("submit", (e) => {
	e.preventDefault()
	const searchValue = form.test.value
	document.querySelector(".dynamic_data").innerHTML = "" 
	document.querySelector(".spinner-container").classList.remove("d-none") 
	document.querySelector(".alert").classList.add("d-none") 
	bringData(`https://google-search74.p.rapidapi.com/?query=${searchValue}}&limit=10&related_keywords=true`)
})