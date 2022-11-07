import { AuthContext, initialAuthState } from '@/context/auth';
import { IuserInfo } from '@/interfaces/userInfo';
import { lazyLoad } from '@/utils/lazyload';
import React, {
  lazy,
  useEffect,
  useState
} from 'react';
import { matchRoutes, RouteObject, useLocation, useNavigate, useRoutes } from 'react-router-dom';
type Route = RouteObject & {
  auth?: boolean;
  children?: Route[];
};
const Login = lazyLoad(lazy(() => import('@/components/LoginCard')));

const LayOut = lazyLoad(lazy(() => import('@/pages/layout')));
const SubLayout = lazyLoad(lazy(() => import('@/pages/layout/SubLayout')));
const AllPosts = lazyLoad(lazy(() => import('@/pages/allPosts')));
const DefaultPosts = lazyLoad(lazy(() => import('@/pages/allPosts/component/DefaultPosts')));
const LikesPosts = lazyLoad(lazy(() => import('@/pages/allPosts/component/LikesPosts')));
const CommentsPosts = lazyLoad(lazy(() => import('@/pages/allPosts/component/CommentsPosts')));
const UserPosts = lazyLoad(lazy(() => import('@/pages/allPosts/component/UserPosts')));
const postDetail = lazyLoad(lazy(() => import('@/pages/postDetail')));
const Bookmark = lazyLoad(lazy(() => import('@/pages/bookmark')));
const BookmarkDetail = lazyLoad(lazy(() => import('@/pages/bookmark/component')));

export const routeConfig: Route[] = [
  {
    path: '/',
    element: LayOut,
    children: [
      {
        path: '',
        element: SubLayout,
        children: [
          {
            path: '',
            element: AllPosts,
            children: [
              {
                index: true,
                element: DefaultPosts,
              },
            ],
          },
          {
            path: ':userId/postsBy',
            element: AllPosts,
            children: [
              {
                path: 'user',
                element: UserPosts,
                auth: true,
              },
              {
                path: 'like',
                element: LikesPosts,
                auth: true,
              },
              {
                path: 'comment',
                element: CommentsPosts,
                auth: true,
              },
              {
                path: 'bookmark',
                element: Bookmark,
                auth: true,
                children: [
                  {
                    path: ':bookmarkId',
                    element: BookmarkDetail,
                  },
                ],
              },
            ],
          },
          {
            path: ':postId',
            element: postDetail,
          },
        ],
      },

      {
        path: 'login',
        element: Login,
      },
    ],
  },
];

const RouterInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const match = matchRoutes<Route>(routeConfig, pathname)!;
  if(!match) return(<div>404</div>)
  const {
    route: { auth },
  } = match[match.length - 1];
  useEffect(() => {
    if (auth) {
      const tokenStorage = localStorage.getItem('token');
      if (!tokenStorage) {
        navigate('/login');
      }
    }
  }, [pathname]);

  const router = useRoutes(routeConfig);
  return router;
};
const Router = () => {
  const [userInfo, setUserInfo] = useState<IuserInfo>(initialAuthState);
  useEffect(() => {
    const tokenStorage = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (tokenStorage && user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      <RouterInfo />
    </AuthContext.Provider>
  );
};
export default Router;
