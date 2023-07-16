import { Route } from 'react-router-dom';
import CleanOutlet from '../../components/layout/CleanOutlet';
import AgentLayout from '../../components/layout/AgentLayout';
import KnowledgeLayout from '../../components/layout/KnowledgeLayout';
import AgentHome from '../../pages/private/agent/AgentHome';
import AgentDashboard from '../../pages/private/agent/dashboard/AgentDashboard';
import Profile from '../../pages/private/Profile';
import Companies from '../../pages/private/agent/companies/Companies';
import Company from '../../pages/private/agent/companies/Company';
import Users from '../../pages/private/agent/users/Users';
import User from '../../pages/private/agent/users/User';
import Unassigned from '../../pages/private/agent/dashboard/Unassigned';
import TicketSearch from '../../pages/private/agent/dashboard/TicketSearch';
import GroupsTicket from '../../pages/private/agent/dashboard/GroupsTicket';
import AgentBlogs from '../../pages/private/agent/blogs/AgentBlogs';
import AgentBlog from '../../pages/private/agent/blogs/AgentBlog';
import AgentBlogImages from '../../pages/private/agent/blogs/AgentBlogImages';
import AgentBlogCreate from '../../pages/private/agent/blogs/AgentBlogCreate';
import AgentArticleCreate from '../../pages/private/agent/knowledge/AgentArticleCreate';
import AgentArticle from '../../pages/private/agent/knowledge/AgentArticle';
import AgentArticles from '../../pages/private/agent/knowledge/AgentArticles';
import AgentArticleImages from '../../pages/private/agent/knowledge/AgentArticleImages';
import KnowledgeArticles from '../../pages/private/knowledge/KnowledgeArticles';
import KnowledgeCategories from '../../pages/private/knowledge/categories/KnowledgeCategories';
import KnowledgeTags from '../../pages/private/knowledge/tags/KnowledgeTags';
import KnowledgeCategory from '../../pages/private/knowledge/categories/KnowledgeCategory';
import KnowledgeTag from '../../pages/private/knowledge/tags/KnowledgeTag';
import ArticleId from '../../pages/private/knowledge/ArticleId';
import AgentTicket from '../../pages/private/agent/dashboard/AgentTicket';

const agentRoutes = (
  <Route path="agent" element={<AgentLayout />}>
    <Route path="" element={<AgentHome />} />
    <Route path="profile" element={<Profile />} />

    <Route path="dashboard" element={<CleanOutlet />}>
      <Route path="" element={<AgentDashboard />} />
      <Route path="unassigned" element={<Unassigned />} />
      <Route path="ticket" element={<TicketSearch />} />
      <Route path="ticket/:id" element={<AgentTicket />} />
      {/* #TODO redundant routes - add groups page  */}
      <Route path="groups/:groupId" element={<GroupsTicket />} />
      <Route path=":group/ticket/:id" element={<AgentTicket />} />
      <Route path=":group/:groupId/ticket/:id" element={<AgentTicket />} />
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
);

export default agentRoutes;
