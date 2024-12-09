import { Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import UnAuthorized from '../components/errors/401';
import Forbidden from '../components/errors/403';
import NotFound from '../components/errors/404';
import Login from '../components/features/Auth/Login';
import Runway from '../components/features/Auth/Runway';
import MainApp from '../containers/App/MainApp';
import PrivateRoutes from './PrivateRoutes';
import { RoleGroup } from './Roles';
import HorizontalNav from '../containers/Topbar/HorizontalNav';
import HandleUpload from '../components/features/Home';
import BestofTodayCard from '../components/features/Home';
import AllProducts from '../components/features/Product';
import AddProductForm from '../components/features/Product/addProduct';
import AddQuotes from '../components/features/Product/addQuotes';
import MostPopularQuotes from '../components/features/Product/mostPopularQuotes';
import ProductList from '../components/features/Product/productItem';
import AllQuotes from '../components/features/Product/getQuotes';

const AppRoutes = () => {
	const loginRoutes: RouteObject = {
		path: '/',
		element: <MainApp />,
		children: [
			{
				path: '/runway',
				element: <Runway />
			},
			{
				path: '/',
				element: 					<AllQuotes/>

				// element: <MostPopularQuotes />
			},
		
		]
	};

	const HomeRoutes = {
		path: '/',
		element: <MainApp />,

		children: [
			{
				path: '/home',
				element: (
					
					// <BestofTodayCard />
					// <MostPopularQuotes/>
					// <ProductList/>
					<AllQuotes/>
					
					
				)
			}
		]
	};
	const ProductRoutes = {
		path: '/',
		element: <MainApp />,

		children: [
			{
				path: '/Product',
				// element: <AllProducts />
				element: <MostPopularQuotes />
				// element: <ProductList />

			},
			{
				path: '/Product/add-product',
				element: <AddQuotes />
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	};

	const errorRoutes = {
		path: '/',
		children: [
			{
				path: '/401',
				element: <UnAuthorized />
			},
			{
				path: '/403',
				element: <Forbidden />
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	};

	const router = useRoutes([loginRoutes, HomeRoutes, errorRoutes,ProductRoutes]);
	return <Suspense>{router}</Suspense>;
};

export default AppRoutes;
