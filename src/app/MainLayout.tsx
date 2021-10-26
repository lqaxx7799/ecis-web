import { Button, Container, Divider, Menu, MenuItem, MenuLabel, Text, Title } from '@mantine/core';
import { PersonIcon, PinLeftIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import authenticationActions from '../common/actions/authentication.actions';
import { useAppDispatch, useAppSelector } from './store';

type Props = {
  children?: React.ReactNode;
  isBleedLayout?: boolean;
};

const MainLayout = ({ children, isBleedLayout }: Props) => {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector((state) => state.authentication);

  const logOut = () => {
    dispatch(authenticationActions.logOut());
  };

  return (
    <div className="nav-md">
      <div className="container body">
        <div className="main_container">
          <div className="col-md-3 left_col">
            <div className="left_col scroll-view">
              <div className="navbar nav_title" style={{ border: 0 }}>
                <a href="index.html" className="site_title">
                  <img src="images/fpd_logo_small.png" />
                  <span>Công ty A</span>
                </a>
              </div>

              <div className="clearfix"></div>
              {/* menu profile quick info */}
              <div className="profile clearfix">
                <div className="profile_pic">
                  <img src="images/user.png" alt="..." className="img-circle profile_img" />
                </div>
                <div className="profile_info">
                  <span>Xin chào,</span>
                  <h2>Ông A</h2>
                </div>
                <div className="clearfix"></div>
              </div>
              {/* menu profile quick info */}

              <br />

              {/* sidebar menu */}
              <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                <div className="menu_section">
                  <h3>Thông tin chung</h3>
                  <ul className="nav side-menu">
                    <li>
                      <a>
                        <i className="fa fa-home"></i> Trang chủ <span className="fa fa-chevron-down" />
                      </a>
                      <ul className="nav child_menu">
                        <li><a href="dashboard.html">Dashboard</a></li>
                      </ul>
                    </li>
                    <li>
                      <a>
                        <i className="fa fa-edit"></i> Đánh giá, Phân loại<span className="fa fa-chevron-down" />
                      </a>
                      <ul className="nav child_menu">                  
                        <li><a href="company-self-evaluation.html">Tự đánh giá</a></li>
                        <li><a href="evaluation_result.html">Kết quả xác minh đánh giá</a></li>
                        <li><a href="evaluation_result_comment.html">Khiếu nại kết quả</a></li>
                      </ul>
                    </li>
                    <li>
                      <a>
                        <i className="fa fa-edit"></i> Thông tin Doanh Nghiệp<span className="fa fa-chevron-down" />
                      </a>
                      <ul className="nav child_menu">
                        <li><a href="copany_profile.html">Cập nhật thông tin liên hệ</a></li>
                      </ul>
                    </li>
                    <li>
                      <a>
                        <i className="fa fa-desktop"></i> Quan hệ kinh doanh <span className="fa fa-chevron-down"/>
                      </a>
                      <ul className="nav child_menu">
                        <li><a href="suppliers.html">Nhà cung cấp</a></li>
                        <li><a href="clients.html">Khánh hàng</a></li>
                      </ul>
                    </li>                  
                  </ul>
                </div>              
              </div>
              {/* sidebar menu */}

              {/* menu footer buttons */}
              <div className="sidebar-footer hidden-small">
                <a data-toggle="tooltip" data-placement="top" title="Settings">
                  <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                  <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Lock">
                  <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                  <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                </a>
              </div>
              {/* menu footer buttons */}
            </div>
          </div>

          {/* top navigation */}
          <div className="top_nav">
            <div className="nav_menu">
              <nav>
                <div className="nav toggle">
                  <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                </div>

                <ul className="nav navbar-nav navbar-right">
                  <li className="">
                    <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      <img src="images/user.png" alt="" />Ông A
                      <span className=" fa fa-angle-down"></span>
                    </a>
                    <ul className="dropdown-menu dropdown-usermenu pull-right">
                      <li><a href="javascript:;"> Hồ sơ cá nhân</a></li>
                      <li>
                        <a href="javascript:;">
                          <span>Cài đặt</span>
                        </a>
                      </li>
                      <li><a href="javascript:;">Trợ giúp</a></li>
                      <li><a href="login.html"><i className="fa fa-sign-out pull-right"></i> Đăng xuất</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* /top navigation */}

          {/* page content */}
          <div className="right_col" role="main">
            {children}
          </div>
          {/* page content */}
        </div>
      </div>

      {/* <!-- jQuery -->
      <script src="vendors/jquery/dist/jquery.min.js"></script>
      <!-- Bootstrap -->
      <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
      <!-- FastClick -->
      <script src="vendors/fastclick/lib/fastclick.js"></script>
      <!-- NProgress -->
      <script src="vendors/nprogress/nprogress.js"></script>
      <!-- Scrolling tab -->
      <script src="vendors/jquery-bootstrap-scrolling-tabs/dist/jquery.scrolling-tabs.min.js"></script>
      <!-- Chart.js -->
      <script src="vendors/Chart.js/dist/Chart.min.js"></script>
      <!-- jQuery Sparklines -->
      <script src="vendors/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
      <!-- Flot -->
      <script src="vendors/Flot/jquery.flot.js"></script>
      <script src="vendors/Flot/jquery.flot.pie.js"></script>
      <script src="vendors/Flot/jquery.flot.time.js"></script>
      <script src="vendors/Flot/jquery.flot.stack.js"></script>
      <script src="vendors/Flot/jquery.flot.resize.js"></script>
      <!-- Flot plugins -->
      <script src="vendors/flot.orderbars/js/jquery.flot.orderBars.js"></script>
      <script src="vendors/flot-spline/js/jquery.flot.spline.min.js"></script>
      <script src="vendors/flot.curvedlines/curvedLines.js"></script>
      <!-- DateJS -->
      <script src="vendors/DateJS/build/date.js"></script>
      <!-- Custom Theme Scripts -->
      <script src="js/custom.js"></script>
      <script type="text/javascript">
        $('.nav-tabs').scrollingTabs({
          bootstrapVersion: 4  
        });

      </script> */}
    </div>
  );

  return (
    <>
      <div className="header">
        <div className="header-main">
          <Button component={Link} to="/" variant="link"><Title>ECIS</Title></Button>
        </div>
        <div className="spacer" />
        <div className="header-end">
          {
            authentication.account ? (
              <Menu
                zIndex={7}
                control={(
                  <Button variant="link">
                    Xin chào, {authentication.account?.email}
                    <TriangleDownIcon />
                  </Button>
                )}
              >
                <MenuLabel>Tài khoản</MenuLabel>
                <MenuItem component={Link} to="/doanh-nghiep" icon={<PersonIcon />}>Quản lý tài khoản</MenuItem>

                <Divider />
                <MenuItem color="red" icon={<PinLeftIcon />} onClick={logOut}>Đăng xuất</MenuItem>                
              </Menu>
            ) : (
              <>
                <Button
                  variant="light"
                  style={{ marginRight: '8px' }}
                  component={Link}
                  to="/dang-nhap"
                >
                  Đăng nhập
                </Button>
                <Button>Đăng ký</Button>
              </>
            )
          }
        </div>
      </div>
      {
        isBleedLayout ? children : (
          <Container className="layout-main">
            {children}
          </Container>
        )
      }
    </>
  );
}

export default MainLayout;