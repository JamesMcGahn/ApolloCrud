import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import CustomerHome from './pages/CustomerHome';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AgentHome from './pages/AgentHome';
import AgentDashboard from './pages/AgentDashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/utils/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import CustomerDashboard from './pages/CustomerDashboard';
import Companies from './pages/Companies';
import Company from './pages/Company';
import Users from './pages/Users';
import User from './pages/User';
import Unassigned from './pages/Unassigned';
import TicketReview from './pages/TicketReview';
import TicketSearch from './pages/TicketSearch';
import GroupsTicket from './pages/GroupsTicket';
import AgentBlogs from './pages/AgentBlogs';
import AgentBlog from './pages/AgentBlog';
import Blog from './pages/Blog';
import BlogId from './pages/BlogId';
import BlogCategories from './pages/BlogCategories';
import BlogCategory from './pages/BlogCategory';
import BlogTags from './pages/BlogTags';
import BlogTag from './pages/BlogTag';
import AgentBlogImages from './pages/AgentBlogImages';
import AgentBlogCreate from './pages/AgentBlogCreate';
import AgentArticleCreate from './pages/AgentArticleCreate';
import AgentArticle from './pages/AgentArticle';
import AgentArticles from './pages/AgentArticles';
import AgentArticleImages from './pages/AgentArticleImages';
import KnowledgeArticles from './pages/KnowledgeArticles';
import KnowledgeCategories from './pages/KnowledgeCategories';
import KnowledgeTags from './pages/KnowledgeTags';
import KnowledgeCategory from './pages/KnowledgeCategory';
import KnowledgeTag from './pages/KnowledgeTag';
import ArticleId from './pages/ArticleId';
import RootLayout from './components/layout/RootLayout';
import CleanOutlet from './components/layout/CleanOutlet';
import KnowledgeLayout from './components/layout/KnowledgeLayout';
import NotFound from './pages/NotFound';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="agent" element={<ProtectedRoute allowedUser="agent" />}>
        <Route path="" element={<AgentHome />} />
        <Route path="profile" element={<Profile />} />

        <Route path="dashboard" element={<CleanOutlet />}>
          <Route path="" element={<AgentDashboard />} />
          <Route path="unassigned" element={<Unassigned />} />
          <Route path="ticket" element={<TicketSearch />} />
          <Route path="ticket/:id" element={<Ticket />} />
          {/* #TODO redundant routes - add groups page  */}
          <Route path="groups/:groupId" element={<GroupsTicket />} />
          <Route path=":group/ticket/:id" element={<Ticket />} />
          <Route path=":group/:groupId/ticket/:id" element={<Ticket />} />
        </Route>
        <Route path="companies" element={<CleanOutlet />}>
          <Route path="" element={<Companies />} />
          <Route path=":id" element={<Company />} />
          <Route path=":id/:userId" element={<User />} />
        </Route>
        <Route path="users" element={<CleanOutlet />}>
          <Route path="" element={<Users />} />
          <Route path=":userId" element={<User />} />
        </Route>
        <Route path="blogs" element={<CleanOutlet />}>
          <Route path="" element={<AgentBlogs />} />
          <Route path="create" element={<AgentBlogCreate />} />
          <Route path=":slug" element={<AgentBlog />} />
          <Route path=":slug/images" element={<AgentBlogImages />} />
        </Route>
        <Route path="knowledge" element={<KnowledgeLayout />}>
          <Route path="" element={<KnowledgeArticles />} />
          <Route path="create" element={<AgentArticleCreate />} />
          <Route path="articles" element={<CleanOutlet />}>
            <Route path="" element={<AgentArticles />} />
            <Route path=":slug" element={<AgentArticle />} />
            <Route path=":slug/images" element={<AgentArticleImages />} />
          </Route>
          <Route path="categories" element={<KnowledgeCategories />}>
            <Route path="" element={<KnowledgeCategories />} />
            <Route path=":category" element={<KnowledgeCategory />} />
            <Route path=":category/:slug" element={<ArticleId />} />
          </Route>
          <Route path="tags" element={<CleanOutlet />}>
            <Route path="" element={<KnowledgeTags />} />
            <Route path=":tag" element={<KnowledgeTag />} />
            <Route path=":tag/:slug" element={<ArticleId />} />
          </Route>
          <Route path=":slug" element={<ArticleId />} />
        </Route>
      </Route>
      <Route path="customer" element={<ProtectedRoute />}>
        <Route path="" element={<CustomerHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<CleanOutlet />}>
          <Route path="" element={<CustomerDashboard />} />
          <Route path="ticket/:id" element={<Ticket />} />
          <Route path="ticket/:id/feedback" element={<TicketReview />} />
        </Route>
      </Route>
      <Route path="blog" element={<CleanOutlet />}>
        <Route path="" element={<Blog />} />
        <Route path="categories" element={<CleanOutlet />}>
          <Route path="" element={<BlogCategories />} />
          <Route path=":category" element={<BlogCategory />} />
          <Route path=":category/:slug" element={<BlogId />} />
        </Route>
        <Route path="tags" element={<CleanOutlet />}>
          <Route path="" element={<BlogTags />} />
          <Route path=":tag" element={<BlogTag />} />
          <Route path=":tag/:slug" element={<BlogId />} />
        </Route>
        <Route path=":slug" element={<BlogId />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default appRouter;
