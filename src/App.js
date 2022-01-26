import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ActivitiesForm from "./Components/Activities/ActivitiesForm";
import CategoriesForm from "./Components/Categories/CategoriesForm";
import NewsForm from "./Components/News/NewsForm";
import SlidesForm from "./Components/Slides/SlidesForm";
import TestimonialForm from "./Components/Testimonials/TestimonialsForm";
import UserForm from "./Components/Users/UsersForm";
import SchoolCampaign from "./Campaigns/School/SchoolCampaign";
import ToysCampaign from "./Campaigns/Toys/ToysCampaign";
import ProjectsForm from "./Components/Projects/ProjectsForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import LoginForm from "./Components/Auth/LoginForm";
import Donacion from "./Donations/Donacion";
import Gracias from "./Donations/Gracias";
import ContactForm from "./Components/Contact/ContactForm";
import Home from "./Pages/Home";
import OrganizationData from "./Components/Organization/OrganizationData";
import OrganizationForm from "./Components/Organization/EditOrganizationDataForm";

function App() {
<<<<<<< HEAD
	return (
		// Agregar newsletter en footer
		<>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/create-activity" component={ActivitiesForm} />
					<Route path="/create-category" component={CategoriesForm} />
					<Route path="/contact" component={ContactForm} />
					<Route path="/create-news" component={NewsForm} />
					<Route path="/backoffice/create-slide" component={SlidesForm} />
					<Route path="/backoffice/organization" component={OrganizationData} />
					<Route
						path="/backoffice/organization/edit"
						component={OrganizationForm}
					/>
					<Route path="/create-testimonials" component={TestimonialForm} />
					<Route path="/create-user" component={UserForm} />
					<Route path="/create-project" component={ProjectsForm} />
					<Route path="/school-campaign" component={SchoolCampaign} />
					<Route path="/toys-campaign" component={ToysCampaign} />
					<Route path="/login" component={LoginForm} />
					<Route path="/register" component={RegisterForm} />
					<Route
						path="/donar"
						component={() => <Donacion message="Quieres donar?" />}
					/>
					<Route path="/gracias" component={Gracias} />
				</Switch>
			</BrowserRouter>
		</>
	);
=======
  return (
    // Agregar newsletter en footer
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/backoffice/create-activity"
            component={ActivitiesForm}
          />
          <Route path="/create-category" component={CategoriesForm} />
          <Route path="/contact" component={ContactForm} />
          <Route path="/create-news" component={NewsForm} />
          <Route path="/contact" component={ContactForm} />
          <Route path="/backoffice/create-slide" component={SlidesForm} />
          <Route path="/backoffice/organization" component={OrganizationData} />
          <Route
            path="/backoffice/organization/edit"
            component={OrganizationForm}
          />
          <Route path="/create-testimonials" component={TestimonialForm} />
          <Route path="/backoffice/create-user" exact component={UserForm} />
          <Route path="/backoffice/create-user/:id" component={UserForm} />
          <Route path="/create-member" component={MembersForm} />
          <Route path="/create-project" component={ProjectsForm} />
          <Route path="/school-campaign" component={SchoolCampaign} />
          <Route path="/toys-campaign" component={ToysCampaign} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route
            path="/donar"
            component={() => <Donacion message="Quieres donar?" />}
          />
          <Route path="/gracias" component={Gracias} />
        </Switch>
      </BrowserRouter>
      <div className="App"></div>
    </>
  );
>>>>>>> 1b3e2a6a08a3c231410bb1ab545ce88027b2f16b
}

export default App;
