import {useEffect} from "react";
import {Link} from "react-router-dom";

import {useDispatch} from "react-redux";
import {useSelector, shallowEqual} from "react-redux";
import {getCategoriesAction} from "../../Redux/actions/categoriesActions";
import {
	isFetchingCategoriesSel,
	categoriesSel,
	messageCategoriesSel,
	errorCategoriesSel,
} from "../../Redux/selector/selectorCategories";

const CategoriesList = () => {

	const dispatch = useDispatch();
	const isFetchingCategories = useSelector(
		isFetchingCategoriesSel,
		shallowEqual
	);
	const categories = useSelector(categoriesSel, shallowEqual);
	const messageCategories = useSelector(messageCategoriesSel, shallowEqual);
	const errorCategories = useSelector(errorCategoriesSel, shallowEqual);

	useEffect(() => {
		dispatch(getCategoriesAction());
	}, []);

	const handleDate = (fecha) => {
		const newDate = new Date(fecha);

		const opciones = {
			year: "numeric",
			month: "long",
			day: "2-digit",
		};

		return newDate.toLocaleDateString("es-ES", opciones);
	};

	const handleEdit = () => {
		// Logica para editar
	};

	const handleDelete = () => {
		// Logica para eliminar
	};

	return (
		<>
			<Link to="/create-category">Crear categoría</Link>
			<h1>Categorías</h1>
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Fecha de Creación</th>
						<th>Editar</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{categories?.data.map((categori) => (
						<tr key={categori.id}>
							<td>{categori.name}</td>
							<td>{handleDate(categori.created_at)}</td>
							<td>
								<button onClick={handleEdit}>Editar</button>
							</td>
							<td>
								<button onClick={handleDelete}>Editar</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default CategoriesList;
