import { Route } from 'react-router-dom';
import Blog from '../../../pages/public/blog/Blog';
import BlogId from '../../../pages/public/blog/BlogId';
import BlogCategories from '../../../pages/public/blog/categories/BlogCategories';
import BlogCategory from '../../../pages/public/blog/categories/BlogCategory';
import BlogTags from '../../../pages/public/blog/tags/BlogTags';
import BlogTag from '../../../pages/public/blog/tags/BlogTag';
import CleanOutlet from '../../../components/layout/CleanOutlet';

const blogRoutes = (
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
);

export default blogRoutes;
