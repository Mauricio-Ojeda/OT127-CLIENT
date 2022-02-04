import React, { useState, useEffect } from "react"
import getNews from "../../Services/newsService"
import Spinner from "../Loaders/Spinner"

const News = () => {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getNews(setNews)
		setLoading(false)
	}, [])

	const newsList = () => {
		return news.length ? (
			news.map((element) => (
				<li className="card-info" key={element.id}>
					<h3>{element.name}</h3>
					<p>{element.description}</p>
				</li>
			))
		) : (
			<p>No hay novedades</p>
		)
	}

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div>
					<h1>Novedades</h1>
					<ul className="list-container">{newsList()}</ul>
				</div>
			)}
		</>
	)
}

export default News
